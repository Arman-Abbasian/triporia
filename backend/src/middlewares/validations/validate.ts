import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { sendError } from '../../utils/sendResponses'

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    sendError(res, 'Validation failed', errors.array(), 422)
    return
  }
  next()
}
