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

export const validateCreateFieldlog = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('description')
    .exists({ values: 'falsy' })
    .withMessage('Content is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  
  body('collection')
    .exists({ values: 'falsy' })
    .withMessage('Collection is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Collection name must be a string')
    .bail()
    .isLength({min: 3})
    .withMessage('Collection name must be at least 3 characters'),

  body('tags.*')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Tags must strings')
    .bail()
    .isLength({min: 3})
    .withMessage('Tags must be at least 3 characters'),



  handleValidationErrors,
];

export const validateUpdateFieldlog = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('collection').exists({ values: 'falsy' }),
      body('tags').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, description) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
    
  body('collection')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Collection name must be a string')
    .bail()
    .isLength({min: 3})
    .withMessage('Collection name must be at least 3 characters'),

  body('tags.*')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Tags must strings')
    .bail()
    .isLength({min: 3})
    .withMessage('Tags must be at least 3 characters'),

  handleValidationErrors,
];

export const validateFieldlogQuery = [
  query('collection')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('collection name must be a string')
    .bail()
    .isLength({min: 10})
    .withMessage('Collection name must be at least 3 characters'),

  query('tags.*')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Tags must be strings')
    .bail()
    .isLength({min: 10})
    .withMessage('Tags must be at least 3 characters'),

  handleValidationErrors,
];
