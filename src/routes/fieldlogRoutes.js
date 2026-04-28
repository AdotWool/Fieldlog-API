import express from 'express';
import {
  getAllFieldlogsHandler,
  getFieldlogByIdHandler,
  createFieldlogHandler,
  updateFieldlogHandler,
  deleteFieldlogHandler,
} from '../controllers/fieldlogController.js';

import {
  validateId,
  validateCreateFieldlog,
  validateUpdateFieldlog,
  validateFieldlogQuery,
} from '../middleware/fieldlogValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeFieldlogOwnership, authorizeCollectionOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', authenticate, validateFieldlogQuery, getAllFieldlogsHandler);
router.get('/:id', authenticate, validateId, authorizeFieldlogOwnership, getFieldlogByIdHandler);
router.post('/', authenticate, validateCreateFieldlog, createFieldlogHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeFieldlogOwnership,
  validateUpdateFieldlog,
  updateFieldlogHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeFieldlogOwnership,
  deleteFieldlogHandler,
);

export default router;
