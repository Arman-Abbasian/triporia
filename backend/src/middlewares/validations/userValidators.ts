import { body } from 'express-validator'

export const commentValidator = [
  body('content')
    .exists({ checkFalsy: true })
    .withMessage('content field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('content is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Name must be between 2 and 500 characters'),
]
export const rateValidator = [
  body('rate')
    .exists({ checkFalsy: true })
    .withMessage('rate field is required')
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage('rate must be an integer between 1 and 5'),
]

export const resendActivateLinkValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ max: 30 })
    .withMessage('Password must be maximum 30 characters'),
]
