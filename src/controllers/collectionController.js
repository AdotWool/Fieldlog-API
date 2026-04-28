import {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
} from '../services/collectionService.js';

export async function getAllCollectionsHandler(req, res) {
  const {
    name = ''
  } = req.query;

  const options = {
    name,
    ownerId: req.user.id
  };
  let collections = await getAllCollections(options);
  res.status(200).json(collections);
}

export async function getCollectionByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const collection = await getCollectionById(id);
  res.status(200).json(collection);
}

export async function createCollectionHandler(req, res) {
  const { name } = req.body;
  const newCollection = await createCollection({ name, ownerId: req.user.id });
  res.status(201).json(newCollection);
}

export async function updateCollectionHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const updatedCollection = await updateCollection(id, { name });
  res.status(200).json(updatedCollection);
}

export async function deleteCollectionHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteCollection(id);
  res.status(204).send();
}
