import { body } from 'express-validator'

export const signupValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Name must be between 2 and 30 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 30 })
    .withMessage('Password must be maximum 30 characters')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Password must contain at least one special character'),
]

export const loginValidator = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('email field is required')
    .bail()
    .withMessage('Email field is required')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('password field is required')
    .bail()
    .withMessage('password field is required')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ max: 30 })
    .withMessage('Password must be maximum 30 characters'),
]

export const resendActivateLinkValidator = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('email field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('password field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ max: 30 })
    .withMessage('Password must be maximum 30 characters'),
]
