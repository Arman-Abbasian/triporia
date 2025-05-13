import { Request, Response } from 'express'

// Signup controller
export const likeController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

export const commentController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

export const rateController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

// Get current user (mocked for now)
export const userController = async (req: Request, res: Response) => {
  // TODO: Fetch user from token/session
  res
    .status(200)
    .json({ user: { id: 1, name: 'John Doe', email: 'john@example.com' } })
}
