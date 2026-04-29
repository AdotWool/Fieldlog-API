import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

export default async function seed() {
  try {
    await prisma.$queryRaw`TRUNCATE logs, collections, tags, users RESTART IDENTITY CASCADE;`;

    const usersData = [
      { email: 'alice@test.com', password: 'slhu3ikjtr8dghfjbl80' },
      { email: 'bob@example.com', password: 'secretpassword' },
      { email: 'charlie@demo.com', password: 'password', role: 'ADMIN' },
    ];

    const users = [];

    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          role: userData.role || 'USER',
        },
      });

      users.push(user);
    }

    await prisma.tag.createMany({
      data: [
        { name: 'Init' },
        { name: 'Test1' },
        { name: 'Test2' },
        { name: 'First' },
        { name: 'Text' },
        { name: 'Building' },
        { name: 'Tree' },
      ]
    });

    for (const user of users) {
      await prisma.collection.createMany({
        data: [
          {
            name: `${user.email.split('@')[0]}Collection`,
            ownerId: user.id,
          },
          {
            name: 'Buildings',
            ownerId: user.id,
          },
          {
            name: 'Forests',
            ownerId: user.id,
          },
          {
            name: 'Fish',
            ownerId: user.id,
          },
        ],
      });
    }

    for (const user of users) {
      await prisma.fieldlog.create({
        data: {
          name: `First log by ${user.email.split('@')[0]}`,
          description: `This is the first log by ${user.email.split('@')[0]}.`,
          collection: {
            connect: { name_ownerId: { name: `${user.email.split('@')[0]}Collection`, ownerId: user.id } }
          },
          tags: {
            connectOrCreate: [
              {
                where: { name: 'First' },
                create: { name: 'First' }
              },
              {
                where: { name: 'Text' },
                create: { name: 'Text' }
              },
              {
                where: { name: 'Test1' },
                create: { name: 'Test1' }
              },
            ]
          },
          owner: {
            connect: {id: user.id}
          }
        }
      });
      await prisma.fieldlog.create({
        data: {
          name: `Cool buildings number ${Math.floor(Math.random() * 100)}`,
          description: `Just an update fieldlog by ${user.email.split('@')[0]}.`,
          collection: {
            connect: { name_ownerId: { name: 'Buildings', ownerId: user.id } }
          },
          tags: {
            connectOrCreate: [
              {
                where: { name: 'Buildings' },
                create: { name: 'Buildings' }
              },
              {
                where: { name: 'Test2' },
                create: { name: 'Test2' }
              },
            ]
          },
          owner: {
            connect: {id: user.id}
          }
        }
      });

    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
  return 'Seed completed successfully!';
}