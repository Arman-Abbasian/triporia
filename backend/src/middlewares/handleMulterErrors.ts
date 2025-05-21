import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { sendError } from '../utils/sendResponses'

export const handleMulterErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    // مثلا محدودیت حجم
    sendError(res, 'File too large. Max size is 5MB')
    return
  } else if (err) {
    // ارورهای دیگر مانند فرمت نامعتبر
    sendError(res, err.message)
    return
  }
  next()
}
