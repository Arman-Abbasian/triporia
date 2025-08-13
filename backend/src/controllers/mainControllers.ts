import { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/sendResponses'
import { prisma } from '../../prisma/client'

export const placesController = async (req: Request, res: Response) => {
  try {
    const places = await prisma.place.findMany({
      include: {
        images: true, // همه تصاویر مرتبط با مکان
        likes: { select: { id: true, userId: true } }, // اطلاعات لایک‌ها
        ratings: { select: { id: true, userId: true, score: true } }, // ریتینگ‌ها
        comments: {
          // کامنت‌ها
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' }, // جدیدترین مکان‌ها اول
    })

    sendSuccess(res, 'All places retrieved successfully', places)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to retrieve places', error, 500)
    return
  }
}

export const placeController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const place = await prisma.place.findUnique({
      where: { id: Number(id) },
      include: {
        images: true,
        likes: { select: { id: true, userId: true } },
        ratings: { select: { id: true, userId: true, score: true } },
        comments: {
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    })

    if (!place) {
      return sendError(res, 'Place not found', {}, 404)
    }

    sendSuccess(res, 'Place retrieved successfully', place)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to retrieve place', error, 500)
    return
  }
}

export const countriesController = async (req: Request, res: Response) => {
  try {
    // گرفتن همه کشورها و حذف تکراری‌ها
    const countries = await prisma.place.findMany({
      distinct: ['country'],
      select: { country: true },
      orderBy: { country: 'asc' }, // اختیاری: مرتب‌سازی حروفی
    })

    // فقط آرایه‌ای از نام کشورها
    const countryList = countries.map((c) => c.country)

    sendSuccess(res, 'Countries retrieved successfully', countryList)
    return
  } catch (error) {
    console.error(error)
    sendError(res, 'Failed to retrieve countries', error, 500)
    return
  }
}
