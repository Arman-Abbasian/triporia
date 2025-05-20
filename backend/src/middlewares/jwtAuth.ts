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

export const jwtAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!accessToken && !refreshToken) {
      sendError(res, 'Authentication required', {}, 401)
      return
    }

    // ✅ بررسی accessToken
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
      req.user = decoded
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
      sendError(res, 'Access token expired. Please login again.', {}, 401)
      return
    }

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as any

    const userInDb = await prisma.user.findUnique({
      where: { id: decodedRefresh.userId },
    })

    if (!userInDb || userInDb.refreshToken !== refreshToken) {
      sendError(res, 'Invalid refresh token', {}, 401)
      return
    }

    // ✅ ساخت توکن‌های جدید
    const newAccessToken = jwt.sign(
      { userId: userInDb.id },
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

    req.user = { userId: userInDb.id }
    next()
  } catch (err) {
    sendError(res, 'Authentication failed', err, 500)
  }
}
