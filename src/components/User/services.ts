
import { Prisma, PrismaClient } from '@prisma/client';
import { User } from './models';

const prisma = new PrismaClient();

export async function createUser(user: User): Promise<User> {
  const createdUser = prisma.user.create({ data: user });
  return createdUser;
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function updateUser(id: string, data: Partial<User>): Promise<User | null> {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string): Promise<User | null> {
  return prisma.user.delete({ where: { id } });
}