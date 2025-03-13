import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		APP_URL: z.string().url(),
		DATABASE_URL: z.string().url(),
		PAGBANK_API_URL: z.string().url(),
		PAGBANK_TOKEN: z.string(),
		PAGBANK_EVENT_URL: z.string(),
		SECRET_TOKEN: z.string(),
		NEXTAUTH_URL: z.string().url(),
		NEXTAUTH_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_SECRET: z.string(),
	},

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		PAGBANK_API_URL: process.env.PAGBANK_API_URL,
		PAGBANK_TOKEN: process.env.PAGBANK_TOKEN,
		PAGBANK_EVENT_URL: process.env.PAGBANK_EVENT_URL,
		SECRET_TOKEN: process.env.SECRET_TOKEN,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
	},
});
