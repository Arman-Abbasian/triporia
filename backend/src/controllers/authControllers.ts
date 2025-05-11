import { Request, Response } from 'express'

// Signup controller
export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

// Login controller
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}

// Get current user (mocked for now)
export const userController = async (req: Request, res: Response) => {
  // TODO: Fetch user from token/session
  res
    .status(200)
    .json({ user: { id: 1, name: 'John Doe', email: 'john@example.com' } })
}
