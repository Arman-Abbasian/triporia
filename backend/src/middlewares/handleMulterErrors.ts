import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { sendError } from '../utils/sendResponses'
import fs from 'fs'

export const handleMulterErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // اگر فایل‌هایی آپلود شده بودن، پاکشون کن
  if (req.files) {
    const files = req.files as Express.Multer.File[]
    for (const file of files) {
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Failed to delete file:', file.path)
      })
    }
  }
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        sendError(res, 'File too large. Max size is 5MB', 400)
        break
      case 'LIMIT_FILE_COUNT':
        sendError(res, 'Too many files. Max 5 allowed', 400)
        break
      case 'LIMIT_UNEXPECTED_FILE':
        sendError(res, 'Unexpected field uploaded', 400)
        break
      default:
        sendError(res, 'File upload error: ' + err.message, 400)
    }
    return
  } else if (err) {
    // ارورهای دیگر مانند فرمت نامعتبر
    sendError(res, err.message)
    return
  }
  next()
}
