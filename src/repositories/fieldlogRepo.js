import prisma from '../config/db.js';

export async function getAll({ name, collection, tags }) {
  const conditions = {};
  if (collection) {
    conditions.AND = [
      { name: { contains: name, mode: 'insensitive' } },
      { collection: { contains: collection, mode: 'insensitive' } },
      { tags: { name: { has: tags, mode: 'insensitive' } } },
    ];
  }
  const fieldlogs = await prisma.fieldlog.findMany({
    where: conditions,
    include: {
      collection: { select: { name: true } },
      tags: { select: { name: true } }
    }
  });
  const formatlogs = [];
  fieldlogs.forEach(log => {
    const {id, name, description, collection, tags, ownerId} = log;
    formatlogs.push({id, name, description, collection: collection.name, tags: tags.map(tag => tag.name), ownerId});
  })
  return formatlogs;
}

export async function getById(id) {

  const fieldlog = await prisma.fieldlog.findUnique({
    where: { id },
    include: {
      collection: { select: { name: true } },
      tags: { select: { name: true } }
    }
  });
  if (fieldlog) {
    const {name, description, collection, tags, ownerId} = fieldlog;
    return {id, name, description, collection: collection.name, tags: tags.map(tag => tag.name), ownerId};
  }
  return fieldlog;
}

export async function create(fieldlogData) {

  const {name, description, collection, tags, ownerId} = fieldlogData;

  const connectOrCreate = [];
  if (tags) {
    tags.forEach(tag => {
      connectOrCreate.push({
        where: { name: tag },
        create: { name: tag }
      });
    });
  }
  try {
    const newFieldlog = await prisma.fieldlog.create({
      data: {
        name,
        description,
        collection: {
          connect: { name_ownerId: { name: collection, ownerId } }
        },
        tags: tags ? {
          connectOrCreate
        } : { tags },
        owner: {
          connect: {id: ownerId}
        }

      },
      include: {
        collection: { select: { name: true} },
        tags: { select: { name: true } }
      }
    });
    const newFormatlog = {
      id: newFieldlog.id,
      name: newFieldlog.name,
      description: newFieldlog.description,
      collection: newFieldlog.collection.name,
      tags: newFieldlog.tags ? newFieldlog.tags.map(tag => tag.name) : newFieldlog.tags,
      ownerId: newFieldlog.ownerId
    };
    return newFormatlog;
  } catch(error) {
    console.log(error.code);
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function update(id, updatedData) {
  
  const {name, description, tags} = updatedData;

  const connectOrCreate = [];
  if (tags) {
    tags.forEach(tag => {
      connectOrCreate.push({
        where: { name: tag },
        create: { name: tag }
      });
    });
  }
  try {
    const updatedFieldlog = await prisma.fieldlog.update({
      where: { id },
      data: {
        name,
        description,
        tags: tags ? {
          connectOrCreate
        } : { tags }

      },
      include: {
        collection: { select: { name: true } },
        tags: { select: { name: true } }
      }
    });
    const { collection, outtags } = updatedFieldlog;
    const updatedFormatlog = {
      id: updatedFieldlog.id,
      name: updatedFieldlog.name,
      description: updatedFieldlog.description,
      collection: updatedFieldlog.collection.name,
      tags: updatedFieldlog.tags ? updatedFieldlog.tags.map(tag => tag.name) : updatedFieldlog.tags,
      ownerId: updatedFieldlog.ownerId
    };
    return updatedFormatlog;
  } catch (error) {
    console.log(error.code);
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedFieldlog = await prisma.fieldlog.delete({
      where: { id },
    });
    return deletedFieldlog;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
