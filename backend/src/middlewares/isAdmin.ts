// middleware/isAdmin.ts
import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/sendResponses'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    sendError(res, 'Access denied. Admins only.', {}, 403)
    return
  }
  next()
}
