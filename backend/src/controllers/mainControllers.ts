import { Request, Response } from 'express'

// Signup controller
export const placesController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

export const placeController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

export const countriesController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}
