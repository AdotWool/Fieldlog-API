import prisma from '../config/db.js';

export async function getAll({ name }) {
  let conditions = {};
  if (name) {
    conditions = { name: { contains: name, mode: 'insensitive' } };
  }
  const tags = await prisma.tag.findMany({
    where: conditions
  });
  return tags;
}

export async function getById(id) {
  const tag = await prisma.tag.findUnique({ where: { id } });
  return tag;
}

export async function create(tagData) {
  try {
    const newTag = await prisma.tag.create({ data: tagData });
    return newTag;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Tag already exists');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, tagData) {
  try {
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: tagData,
    });
    return updatedTag;
  } catch (error) {
    if (error.code === 'P2025') return null;
    else if (error.code === 'P2002') {
      const err = new Error('Tag already exists');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedTag = await prisma.tag.delete({
      where: { id },
    });
    return deletedTag;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
