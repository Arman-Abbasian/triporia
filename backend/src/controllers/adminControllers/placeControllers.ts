import { Request, Response } from 'express'
import { sendError, sendSuccess } from '../../utils/sendResponses'
import { prisma } from '../../../prisma/client'

// Add new place with a cover image
export const addPlaceController = async (
  req: Request & { file?: any },
  res: Response
) => {
  try {
    const { name, country, city, description } = req.body
    const file = req.file

    if (!file) {
      sendError(res, 'cover image is required')
      return
    }

    const newPlace = await prisma.place.create({
      data: {
        name,
        country,
        city,
        description,
        coverImage: `/uploads/images/places/${file.filename}`,
      },
    })
    sendSuccess(res, 'Place created successfully', newPlace, 201)
    return
  } catch (err) {
    sendError(res, 'Failed to add place', err)
    return
  }
}

// Add additional images for a place
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
            url: `/uploads/images/places/${file.filename}`,
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
export const editPlaceController = async (
  req: Request & { file?: any },
  res: Response
) => {
  try {
    const placeId = Number(req.params.placeId)
    const { name, country, city, description } = req.body
    const file = req.file

    const existingPlace = await prisma.place.findUnique({
      where: { id: placeId },
    })
    if (!existingPlace) {
      sendError(res, 'Place not found')
      return
    }

    const updateData: any = { name, country, city, description }

    if (file) {
      // حذف عکس قبلی از دیسک
      const fs = require('fs')
      const oldImagePath = `public${existingPlace.coverImage}`
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath)

      // جایگزینی عکس جدید
      updateData.coverImage = `/uploads/images/places/${file.filename}`
    }

    const updatedPlace = await prisma.place.update({
      where: { id: placeId },
      data: updateData,
    })

    sendSuccess(res, 'Place updated successfully', updatedPlace)
  } catch (err) {
    sendError(res, 'Failed to update place', err)
  }
}

// remove a place image
export const deletePlaceImageController = async (
  req: Request,
  res: Response
) => {
  try {
    const placeId = Number(req.params.placeId)
    const imageId = Number(req.params.imageId)

    // مطمئن شو عکس متعلق به اون مکان هست
    const image = await prisma.placeImage.findFirst({
      where: {
        id: imageId,
        placeId: placeId,
      },
    })

    if (!image) {
      sendError(res, 'Image not found or does not belong to this place')
      return
    }
    // حذف از دیسک
    const fs = require('fs')
    const imagePath = `public${image.url}`
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)

    // حذف از دیتابیس
    await prisma.placeImage.delete({ where: { id: imageId } })

    sendSuccess(res, 'Image deleted successfully')
    return
  } catch (err) {
    sendError(res, 'Failed to delete image', err)
    return
  }
}

// Remove a place
export const removePlaceController = async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    await prisma.place.delete({ where: { id: placeId } })
    //  delete related images/comments/likes/...(white it is onDelete: Cascade in schema)
    sendSuccess(res, 'Place removed successfully')
    return
  } catch (err) {
    sendError(res, 'Failed to remove place', err)
    return
  }
}
