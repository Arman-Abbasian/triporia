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
      return sendError(res, 'Invalid status value', {}, 400)
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

    return sendSuccess(
      res,
      `Comment ${status} successfully`,
      updatedComment,
      200
    )
  } catch (error) {
    sendError(res, 'Something went wrong while updating comment', error, 500)
    return
  }
}

// remove a  comment
export const removeCommentController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
// Login controller
export const getPlaceCommentsController = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}

export const getAllCommentsController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: Check user, compare password, generate token
  res.status(200).json({ message: 'User logged in successfully' })
}
