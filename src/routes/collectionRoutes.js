import express from 'express';
import {
  getAllCollectionsHandler,
  getCollectionByIdHandler,
  createCollectionHandler,
  updateCollectionHandler,
  deleteCollectionHandler,
} from '../controllers/collectionController.js';

import {
  validateId,
  validateCollectionBody,
  validateCollectionQuery,
} from '../middleware/collectionValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeCollectionOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', authenticate, validateCollectionQuery, getAllCollectionsHandler);
router.get('/:id', authenticate, validateId, authorizeCollectionOwnership, getCollectionByIdHandler);
router.post('/', authenticate, validateCollectionBody, createCollectionHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeCollectionOwnership,
  validateCollectionBody,
  updateCollectionHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeCollectionOwnership,
  deleteCollectionHandler,
);

export default router;
