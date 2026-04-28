import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateTagBody = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .custom(value => !/\s/.test(value))
    .withMessage('Tag name cannot have spaces')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Tag name must be at least 3 characters'),

  handleValidationErrors,
];

export const validateTagQuery = [
  query('name')
    .optional()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage('Tag name must be at least 3 characters'),

  handleValidationErrors,
];
