// middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
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

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!accessToken && !refreshToken) {
      return sendError(res, 'Authentication required', {}, 401)
    }

    // ✅ بررسی accessToken
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
      req.user = decoded
      return next()
    } catch (err: any) {
      if (err.name !== 'TokenExpiredError') {
        return sendError(res, 'Invalid access token', {}, 401)
      }
      // continue to refresh token logic
    }

    // ✅ بررسی refreshToken
    if (!refreshToken) {
      return sendError(
        res,
        'Access token expired. Please login again.',
        {},
        401
      )
    }

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as any

    const userInDb = await prisma.user.findUnique({
      where: { id: decodedRefresh.userId },
    })

    if (!userInDb || userInDb.refreshToken !== refreshToken) {
      return sendError(res, 'Invalid refresh token', {}, 401)
    }

    // ✅ ساخت توکن‌های جدید
    const newAccessToken = jwt.sign(
      { userId: userInDb.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' }
    )

    const newRefreshToken = jwt.sign(
      { userId: userInDb.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    )

    // ✅ ذخیره refresh جدید در DB
    await prisma.user.update({
      where: { id: userInDb.id },
      data: { refreshToken: newRefreshToken },
    })

    // ✅ ذخیره توکن‌ها در cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 1000, // 1 روز
    })

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
    })

    req.user = { userId: userInDb.id }
    next()
  } catch (err) {
    return sendError(res, 'Authentication failed', err, 500)
  }
}
