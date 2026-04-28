import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/fieldlogRepo.js';

export async function getAllFieldlogs(options) {
  return getAll(options);
}

export async function getFieldlogById(id) {
  const fieldlog = await getById(id);
  if (fieldlog) return fieldlog;
  else {
    const error = new Error(`Fieldlog ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createFieldlog(fieldlogData) {
  const createdFieldlog = await create(fieldlogData);
  if (createdFieldlog) return createdFieldlog;
  else {
    const error = new Error(`Collection not found`);
    error.status = 404;
    throw error;
  }
}

export async function updateFieldlog(id, updatedData) {
  const updatedFieldlog = await update(id, updatedData);
  if (updatedFieldlog) return updatedFieldlog;
  else {
    const error = new Error(`Fieldlog ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteFieldlog(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Fieldlog ${id} not found`);
    error.status = 404;
    throw error;
  }
}
