import { getFieldlogById } from '../services/fieldlogService.js';
import { getAllCollections, getCollectionById } from '../services/collectionService.js';

export async function authorizeFieldlogOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const fieldlog = await getFieldlogById(id);
  if (fieldlog.ownerId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}

export async function authorizeCollectionOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const collection = await getCollectionById(id);
  if (collection.ownerId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}