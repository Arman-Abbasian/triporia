import { body } from 'express-validator'

export const idValidator = [
  body('id').isInt({ gt: 0 }).withMessage('id must be an integer'),
]
