import { Request, Response } from 'express'
import { sendError, sendSuccess } from '../../utils/sendResponses'
import { prisma } from '../../../prisma/client'

// Accept comment
export const acceptCommentController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body // accepted یا rejected

  try {
    // 1. Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      sendError(res, 'Invalid status value', {}, 400)
      return
    }

    // 2. Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    })

    if (!comment) {
      return sendError(res, 'Comment not found', {}, 404)
    }

    // 3. Update comment status
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { status },
    })

    sendSuccess(res, `Comment ${status} successfully`, updatedComment, 200)
    return
  } catch (error) {
    sendError(res, 'Something went wrong while updating comment', error, 500)
    return
  }
}

// remove a  comment
export const removeCommentController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    // 1. Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    })

    if (!comment) {
      sendError(res, 'Comment not found', {}, 404)
      return
    }

    // 2. Delete the comment
    await prisma.comment.delete({
      where: { id: Number(id) },
    })

    sendSuccess(res, 'Comment deleted successfully', {}, 200)
    return
  } catch (error) {
    sendError(res, 'Something went wrong while deleting comment', error, 500)
    return
  }
}

// get comment for one place controller
export const getPlaceCommentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { placeId } = req.params

    // Validate postId
    if (!placeId) {
      sendError(res, 'Post ID is required', {}, 400)
      return
    }

    // Fetch comments for the post
    const comments = await prisma.comment.findMany({
      where: { placeId: Number(placeId) },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          // Optional: Include user info
          select: { id: true, name: true, email: true },
        },
      },
    })

    sendSuccess(res, 'Comments fetched successfully', comments)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Internal server error', 500)
    return
  }
}

//get All comments
export const getAllCommentsController = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        place: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    sendSuccess(res, 'All comments retrieved successfully', comments)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Internal server error', error)
    return
  }
}
