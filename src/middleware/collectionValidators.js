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

export const validateCollectionBody = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Collection name must be at least 3 characters'),

  handleValidationErrors,
];

export const validateCollectionQuery = [
  query('name')
    .optional()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage('Collection name must be at least 3 characters'),

  handleValidationErrors,
];
