import {
  getAllFieldlogs,
  getFieldlogById,
  createFieldlog,
  updateFieldlog,
  deleteFieldlog,
} from '../services/fieldlogService.js';

export async function getAllFieldlogsHandler(req, res) {
  const {
    name = '',
    collection = '',
    tag = null
  } = req.query;

  let tags;
  if (tag) {
    if (Array.isArray(tag)) tags = tag;
    else tags = [tag];
  }

  const options = {
    name,
    collection,
    tags,
    ownerId: req.user.id
  };
  let fieldlogs = await getAllFieldlogs(options);
  res.status(200).json(fieldlogs);
}

export async function getFieldlogByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const fieldlog = await getFieldlogById(id);
  res.status(200).json(fieldlog);
}

export async function createFieldlogHandler(req, res) {
  const { name, description, collection, tags } = req.body;
  const newFieldlog = await createFieldlog({ name, description, collection, tags, ownerId: req.user.id });
  res.status(201).json(newFieldlog);
}

export async function updateFieldlogHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, description, fieldlog, tags} = req.body;
  const updatedFieldlog = await updateFieldlog(id, { name, description, fieldlog, tags, ownerId: req.user.id });
  res.status(200).json(updatedFieldlog);
}

export async function deleteFieldlogHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteFieldlog(id);
  res.status(204).send();
}
