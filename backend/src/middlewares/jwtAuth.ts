// middleware/auth.ts
import { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { sendError } from '../utils/sendResponses'
import { prisma } from '../../prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const checkUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    // Authentication level check
    if (!accessToken && !refreshToken) {
      sendError(res, 'Authentication required', {}, 401)
      return
    }
    // بررسی accessToken
    try {
      const accessTokenDecoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      )
      req.user = accessTokenDecoded
      //بعد از next()، ادامه کد داخل این middleware اجرا نمی‌شه
      next()
      return
    } catch (err: any) {
      if (err.name !== 'TokenExpiredError') {
        sendError(res, 'Invalid access token', {}, 401)
        return
      }
    }

    // ✅ بررسی refreshToken
    if (!refreshToken) {
      sendError(res, 'Refresh token expired. Please login again.', {}, 401)
      return
    }

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as any

    const userInRefreshTokenDb = await prisma.refreshToken.findUnique({
      where: { userId: decodedRefresh.userId, token: refreshToken },
    })

    if (!userInRefreshTokenDb) {
      sendError(res, 'Invalid refresh token', {}, 401)
      return
    }

    const newRefreshToken = jwt.sign(
      { userId: userInRefreshTokenDb.userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    )

    await prisma.refreshToken.update({
      where: { id: userInRefreshTokenDb.id },
      data: { token: newRefreshToken },
    })

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const newAccessToken = jwt.sign(
      { userId: userInRefreshTokenDb.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' }
    )

    // ✅ ذخیره توکن‌ها در cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    })

    req.user = { userId: userInRefreshTokenDb.id }
    next()
  } catch (err) {
    sendError(res, 'Authentication failed', err, 500)
  }
}

export const checkGuest: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req?.cookies?.accessToken
    const refreshToken = req?.cookies?.refreshToken

    if (accessToken) {
      const decodedAccess = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      )
      const userInDb = await prisma.user.findUnique({
        where: { id: Number(decodedAccess) },
      })
      if (userInDb) {
        sendError(res, 'user logged in', {}, 400)
        return
      }
    }
    if (refreshToken) {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      )

      const userInDb = await prisma.refreshToken.findUnique({
        where: { userId: Number(decodedRefresh), token: refreshToken },
      })

      if (userInDb) {
        sendError(res, 'user logged in', {}, 400)
        return
      }
    }

    next()
  } catch (err) {
    sendError(res, 'Internal server Error', err, 500)
    console.log(err)
  }
}
