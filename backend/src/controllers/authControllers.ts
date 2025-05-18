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
      sendError(res, 'User with this email already exists', {}, 409)
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const token = crypto.randomBytes(32).toString('hex')
    const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 12 * 1000) // 1 روز بعد

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: false,
        activationToken: token,
        tokenExpiresAt,
      },
    })

    const activationToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_EMAIL_SECRET as string,
      { expiresIn: '1h' }
    )

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
//user Activate controller

export const activateAccountController = async (
  req: Request,
  res: Response
) => {
  const { token } = req.params

  const user = await prisma.user.findFirst({
    where: {
      activationToken: token,
      tokenExpiresAt: {
        gte: new Date(), // بررسی انقضا
      },
    },
  })

  if (!user) {
    return sendError(res, 'Token is invalid or has expired', 400)
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isActive: true,
      activationToken: null,
      tokenExpiresAt: null,
    },
  })

  sendSuccess(res, 'Account activated successfully')
}
//resend activate link
export const resendActivateLinkController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.isActive) {
    return sendError(res, 'User not found or already active', 400)
  }

  const token = crypto.randomBytes(32).toString('hex')
  const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      activationToken: token,
      tokenExpiresAt,
    },
  })

  const activationLink = `${process.env.CLIENT_URL}/auth/activate/${token}`
  await sendActivationEmail(email, activationLink)

  sendSuccess(res, 'Activation email resent')
}
// login controller
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
// logout controller
export const logoutController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
