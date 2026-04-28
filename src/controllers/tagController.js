import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from '../services/tagService.js';

export async function getAllTagsHandler(req, res) {
  const {
    name = ''
  } = req.query;

  const options = {
    name
  };
  let tags = await getAllTags(options);
  res.status(200).json(tags);
}

export async function getTagByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const tag = await getTagById(id);
  res.status(200).json(tag);
}

export async function createTagHandler(req, res) {
  const { name } = req.body;
  const newTag = await createTag({ name });
  res.status(201).json(newTag);
}

export async function updateTagHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const updatedTag = await updateTag(id, { name });
  res.status(200).json(updatedTag);
}

export async function deleteTagHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteTag(id);
  res.status(204).send();
}
