import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendError, sendSuccess } from '../utils/sendResponses'
import { prisma } from '../../prisma/client'
import { sendActivationEmail } from '../utils/sendActivationEmail'

//singup controller
export const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      //برای ثبت نام تکراری معمولا 409 برمی گردونن
      sendError(res, 'User with this email already exists', {}, 409)
      return
    }
    //اون پارامتر دوم بهش می گن salt rounds یا cost factor. که نشون دهنده درجه امنیت است
    //هر چه بالاتر امنتیت بیشتر ولی زمان بیشتر برای انجام هش
    //10 عدد مناسبی است
    const hashedPassword = await bcrypt.hash(password, 10)

    //برای ریست پسسورد یا لینک فعالسازی معمولا از این کریپتو استفاده می کنند
    const activationToken = crypto.randomBytes(32).toString('hex')
    const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 12 * 1000) // 1 روز بعد

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: false,
        activationToken,
        tokenExpiresAt,
      },
    })

    const activationLink = `${process.env.BACKEND_URL}/auth/activate/${activationToken}`

    await sendActivationEmail(user.email, activationLink)

    sendSuccess(
      res,
      'Signup successful. Please check your email to activate your account.',
      {
        userId: user.id,
      },
      201
    )
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Signup failed', error, 500)
    return
  }
}

// login controller
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // گرفتن IP
    let ipAddress = req.ip || 'unknown'

    // اگر چندتا IP هست (مثلاً پشت چند پروکسی باشه)، فقط اولینش رو بگیر
    if (ipAddress.includes(',')) {
      ipAddress = ipAddress.split(',')[0].trim()
    }
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return sendError(res, 'Email or Password is not true', {}, 404)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return sendError(res, 'Email or Password is not true', {}, 404)

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1d' }
    )

    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    )

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        device: req.headers['user-agent'], // مثال: مرورگر و سیستم عامل
        ipAddress: ipAddress, // آی‌پی کاربر
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 روز بعد
      },
    })

    res.cookie('accessToken', accessToken, {
      httpOnly: true, // از دسترس جاوااسکریپت خارجه
      secure: process.env.NODE_ENV === 'production', // فقط روی HTTPS
      sameSite: 'lax', // CSRF protection نسبی
      maxAge: 24 * 60 * 60 * 1000, // 1 روز
    })

    // تنظیم Refresh Token در کوکی
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
    })

    // موفقیت
    sendSuccess(res, 'Login successful')
  } catch (error) {
    sendError(res, 'Login failed', error, 500)
  }
}
