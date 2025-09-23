import { Request, Response } from 'express'
import { prisma } from '../../prisma/client'
import { sendError, sendSuccess } from '../utils/sendResponses'
import { sendActivationEmail } from '../utils/sendActivationEmail'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const LikeController = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const userId = req.user.id
    const { placeId } = req.body
    if (!placeId) {
      sendError(res, 'placeId is required', 400)
      return
    }

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

    if (!placeId) {
      sendError(res, 'placeId is required', 400)
      return
    }

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

    if (!placeId) {
      sendError(res, 'Place not found')
      return
    }
    if (!content) {
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

// logout controller
export const logoutController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      sendError(res, 'No refresh token found', {}, 400)
      return
    }
    const findrefreshToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    })
    if (!findrefreshToken) {
      sendError(res, 'No refresh token found', {}, 400)
      return
    }

    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    })

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    sendSuccess(res, 'Logged out successfully')
    return
  } catch (err) {
    sendError(res, 'Logout failed', err, 500)
    return
  }
}

//user Activate controller
export const activateAccountController = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params
    if (!token) {
      sendError(res, 'there is no token', 400)
      return
    }
    const user = await prisma.user.findUnique({
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
  } catch (error) {
    sendError(res, 'Activate Account failed', error, 500)
    return
  }
}

//resend activate link
export const resendActivateLinkController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return sendError(res, 'Email or Password is not true', {}, 404)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return sendError(res, 'Email or Password is not true', {}, 404)

    if (user.isActive) {
      return sendError(res, 'User is already active', 400)
    }
    if (user.tokenExpiresAt && user.tokenExpiresAt > new Date(Date.now())) {
      return sendError(res, 'privious Link is valid', 400)
    }
    const token = crypto.randomBytes(32).toString('hex')
    const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 12 * 1000)

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
  } catch (error) {
    sendError(res, 'resendActivateLinkError', error)
  }
}
