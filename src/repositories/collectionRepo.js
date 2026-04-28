import prisma from '../config/db.js';

export async function getAll({ name }) {
  let conditions = {};
  if (name) {
    conditions = { name: { contains: name, mode: 'insensitive' } };
  }
  const collections = await prisma.collection.findMany({
    where: conditions
  });
  return collections;
}

export async function getById(id) {
  const collection = await prisma.collection.findUnique({ where: { id } });
  return collection;
}

export async function create(collectionData) {
  try {
    const newCollection = await prisma.collection.create({ data: collectionData });
    return newCollection;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Collection already exists');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, updatedData) {
  try {
    const updatedCollection = await prisma.collection.update({
      where: { id },
      data: updatedData,
    });
    return updatedCollection;
  } catch (error) {
    if (error.code === 'P2025') return null;
    else if (error.code === 'P2002') {
      const err = new Error('Collection already exists');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedCollection = await prisma.collection.delete({
      where: { id },
    });
    return deletedCollection;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
