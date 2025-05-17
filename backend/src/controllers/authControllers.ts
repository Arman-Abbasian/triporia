import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: false,
      },
    })
    console.log(user)
    const activationToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_EMAIL_SECRET as string,
      { expiresIn: '1h' }
    )

    const activationLink = `${process.env.CLIENT_URL}/auth/activate/${activationToken}`

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

  try {
    const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET as string)
    const userId = (payload as any).userId

    await prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    })

    sendSuccess(res, 'Account activated successfully')
    return
  } catch (err) {
    sendError(res, 'Invalid or expired token', err, 400)
    return
  }
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
