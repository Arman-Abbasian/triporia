import { Response } from 'express'

export const sendSuccess = (
  res: Response,
  message: string,
  data: any = {},
  statusCode = 200
) => {
  return res.status(statusCode).json({
    isSuccess: true,
    message,
    data,
    error: null,
  })
}

export const sendError = (
  res: Response,
  message: string,
  error: any = {},
  statusCode = 400
) => {
  return res.status(statusCode).json({
    isSuccess: false,
    message,
    data: null,
    error,
  })
}
