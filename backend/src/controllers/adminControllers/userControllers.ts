import { Request, Response } from 'express'
import { sendError, sendSuccess } from '../../utils/sendResponses'
import { prisma } from '../../../prisma/client'

// Edit user controller
export const editUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, role, isActive } = req.body

  try {
    // بررسی وجود کاربر
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) {
      sendError(res, 'User not found', {}, 404)
      return
    }

    // بروزرسانی فقط فیلدهای مجاز
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    sendSuccess(res, 'User updated successfully', updatedUser)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to update user', error, 500)
    return
  }
}
// remove user controller
export const removeUserController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    // بررسی وجود کاربر
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) {
      sendError(res, 'User not found', {}, 404)
      return
    }

    // حذف کاربر
    await prisma.user.delete({ where: { id: Number(id) } })

    sendSuccess(res, 'User deleted successfully')
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to delete user', error, 500)
    return
  }
}

// remove All users controller
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    sendSuccess(res, 'All users retrieved successfully', users)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to retrieve users', error, 500)
    return
  }
}

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    if (!user) {
      sendError(res, 'User not found', {}, 404)
      return
    }

    sendSuccess(res, 'User retrieved successfully', user)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to retrieve user', error, 500)
    return
  }
}
