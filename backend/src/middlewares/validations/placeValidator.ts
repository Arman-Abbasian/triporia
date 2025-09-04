import { body } from 'express-validator'

export const addPlaceValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('place name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('country')
    .trim()
    .notEmpty()
    .withMessage('country name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('city name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('description is required')
    .isLength({ min: 10 })
    .withMessage('description must be minimum 10 characters'),
  ,
]
