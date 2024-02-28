import { env } from '@/env';
import { PrismaClient } from '@prisma/client';

console.log(env.DATABASE_URL);

export const prisma = new PrismaClient({
	log: ['error', 'info', 'query'],
});
