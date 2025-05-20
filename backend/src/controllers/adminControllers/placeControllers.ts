// controllers/placeController.ts
import { Request, Response } from 'express'
import path from 'path'
import { sendError, sendSuccess } from '../../utils/sendResponses'
import { prisma } from '../../../prisma/client'

// Add new place with a primary image
export const addPlaceController = async (req: Request, res: Response) => {
  try {
    const { name, country, city, description } = req.body
    const file = req.file

    if (!file) {
      sendError(res, 'Primary image is required')
      return
    }

    const newPlace = await prisma.place.create({
      data: {
        name,
        country,
        city,
        description,
        imageUrl: `/uploads/places/${file.filename}`,
      },
    })

    sendSuccess(res, 'Place created successfully', newPlace, 201)
    return
  } catch (err) {
    sendError(res, 'Failed to add place', err)
    return
  }
}

// Upload additional images for a place
export const addPlaceImagesController = async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    const files = req.files as Express.Multer.File[]

    if (!files || files.length === 0) {
      sendError(res, 'No images uploaded')
      return
    }

    const place = await prisma.place.findUnique({ where: { id: placeId } })
    if (!place) {
      sendError(res, 'Place not found', {}, 404)
      return
    }

    const createdImages = await Promise.all(
      files.map((file) =>
        prisma.placeImage.create({
          data: {
            placeId,
            imageUrl: `/uploads/places/${file.filename}`,
          },
        })
      )
    )

    sendSuccess(res, 'Images uploaded successfully', createdImages, 201)
    return
  } catch (err) {
    sendError(res, 'Failed to upload images', err)
    return
  }
}

// Edit a place
export const editPlaceController = async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    const { name, country, city, description } = req.body

    const updatedPlace = await prisma.place.update({
      where: { id: placeId },
      data: { name, country, city, description },
    })

    sendSuccess(res, 'Place updated successfully', updatedPlace)
    return
  } catch (err) {
    sendError(res, 'Failed to update place', err)
    return
  }
}

// Remove a place
export const removePlaceController = async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)

    // Optional: delete related images/comments/likes/etc.
    await prisma.place.delete({ where: { id: placeId } })

    sendSuccess(res, 'Place removed successfully')
    return
  } catch (err) {
    sendError(res, 'Failed to remove place', err)
    return
  }
}
