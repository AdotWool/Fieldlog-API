import express from 'express';
import {
  getAllTagsHandler,
  getTagByIdHandler,
  createTagHandler,
  updateTagHandler,
  deleteTagHandler,
} from '../controllers/tagController.js';

import {
  validateId,
  validateTagBody,
  validateTagQuery,
} from '../middleware/tagValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', validateTagQuery, getAllTagsHandler);
router.get('/:id', validateId, getTagByIdHandler);
router.post('/', authenticate, validateTagBody, createTagHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeRoles('ADMIN'),
  validateTagBody,
  updateTagHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeRoles('ADMIN'),
  deleteTagHandler,
);

export default router;
