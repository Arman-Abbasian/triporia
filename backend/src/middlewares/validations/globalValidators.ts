import { body } from 'express-validator'

export const idValidator = [
  body('id')
    .exists({ checkFalsy: true })
    .withMessage('id is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('id must be an integer'),
]
