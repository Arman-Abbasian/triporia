import { body } from 'express-validator'

export const commentValidator = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('content is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Name must be between 2 and 500 characters'),
]

export const loginValidator = [
  body('email')
    .exists()
    .withMessage('Email field is required')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .exists()
    .withMessage('password field is required')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ max: 30 })
    .withMessage('Password must be maximum 30 characters'),
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
