import { body } from 'express-validator'

export const addPlaceValidator = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('name field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('place name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('country')
    .exists({ checkFalsy: true })
    .withMessage('country field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('country name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('city')
    .exists({ checkFalsy: true })
    .withMessage('city field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('city name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('description field is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('description is required')
    .isLength({ min: 10 })
    .withMessage('description must be minimum 10 characters'),
  ,
]
