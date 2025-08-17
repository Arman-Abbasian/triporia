import { Request, Response } from 'express'
import { prisma } from '../../prisma/client'
import { sendError, sendSuccess } from '../utils/sendResponses'

export const LikeController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id
    const { placeId } = req.body

    const existingLike = await prisma.like.findUnique({
      where: { userId_placeId: { userId, placeId } },
    })

    if (existingLike) {
      await prisma.like.delete({
        where: { userId_placeId: { userId, placeId } },
      })
      sendSuccess(res, 'Like removed')
      return
    } else {
      await prisma.like.create({
        data: { userId, placeId },
      })
      sendSuccess(res, 'Place liked')
      return
    }
  } catch (err) {
    sendError(res, 'Failed to toggle like', err)
    return
  }
}

export const BookmarkController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id
    const { placeId } = req.body

    const existingLike = await prisma.bookmark.findUnique({
      where: { userId_placeId: { userId, placeId } },
    })

    if (existingLike) {
      await prisma.bookmark.delete({
        where: { userId_placeId: { userId, placeId } },
      })
      sendSuccess(res, 'bookmark removed')
      return
    } else {
      await prisma.bookmark.create({
        data: { userId, placeId },
      })
      sendSuccess(res, 'Place bookmarked')
      return
    }
  } catch (err) {
    sendError(res, 'Failed to toggle bookmark', err)
    return
  }
}

export const AddCommentController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id
    const { placeId, content } = req.body

    if (!content) {
      sendError(res, 'Place not found')
      return
    }
    if (!placeId) {
      sendError(res, 'comment content are required')
      return
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        placeId,
        userId,
      },
      include: {
        user: { select: { name: true } },
      },
    })

    sendSuccess(res, 'Comment added', newComment, 201)
    return
  } catch (err) {
    sendError(res, 'Failed to add comment', err)
    return
  }
}

export const AddRateController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id
    const { placeId, score } = req.body

    if (!placeId || typeof score !== 'number' || score < 1 || score > 5) {
      sendError(res, 'Invalid rating data')
      return
    }

    const updatedRating = await prisma.rating.upsert({
      where: {
        userId_placeId: { userId, placeId },
      },
      update: { score },
      create: { userId, placeId, score },
    })

    sendSuccess(res, 'Rating submitted', updatedRating)
    return
  } catch (err) {
    sendError(res, 'Failed to submit rating', err)
    return
  }
}

export const userController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    if (!user) {
      sendError(res, 'User not found')
      return
    }

    sendSuccess(res, 'User profile fetched', user)
    return
  } catch (err) {
    sendError(res, 'Failed to fetch user profile', err)
    return
  }
}

export const editUserController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id
    const { name } = req.body

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    sendSuccess(res, 'User profile updated', updatedUser)
    return
  } catch (err) {
    sendError(res, 'Failed to update user profile', err)
    return
  }
}
