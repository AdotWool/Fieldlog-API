import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/tagRepo.js';

export async function getAllTags(options) {
  return getAll(options);
}

export async function getTagById(id) {
  const tag = await getById(id);
  if (tag) return tag;
  else {
    const error = new Error(`Tag ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createTag(tagData) {
  return create(tagData);
}

export async function updateTag(id, updatedData) {
  const updatedTag = await update(id, updatedData);
  if (updatedTag) return updatedTag;
  else {
    const error = new Error(`Tag ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteTag(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Tag ${id} not found`);
    error.status = 404;
    throw error;
  }
}
