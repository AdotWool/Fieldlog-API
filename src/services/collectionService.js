import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/collectionRepo.js';

export async function getAllCollections(options) {
  return getAll(options);
}

export async function getCollectionById(id) {
  const collection = await getById(id);
  if (collection) return collection;
  else {
    const error = new Error(`Collection ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createCollection(collectionData) {
  return create(collectionData);
}

export async function updateCollection(id, updatedData) {
  const updatedCollection = await update(id, updatedData);
  if (updatedCollection) return updatedCollection;
  else {
    const error = new Error(`Collection ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteCollection(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Collection ${id} not found`);
    error.status = 404;
    throw error;
  }
}
