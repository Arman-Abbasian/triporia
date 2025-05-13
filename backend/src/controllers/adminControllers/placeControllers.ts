import { Request, Response } from 'express'

// Signup controller
export const addPlaceController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // TODO: Add validation, hashing, and save user with Prisma
  res.status(201).json({ message: 'User signed up successfully' })
}

// Login controller
export const editPlaceController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
// Login controller
export const removePlaceController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
export const getPlacesController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}

export const getPlaceController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
