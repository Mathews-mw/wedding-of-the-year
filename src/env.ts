import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		APP_URL: z.string().url(),
		DATABASE_URL: z.string().url(),
		PAGSEGURO_TOKEN: z.string(),
		PAGSEGURO_REDIRECT_URL: z.string(),
		PAGSEGURO_RETURN_URL: z.string(),
		PAGSEGURO_NOTIFICATIONS_URL: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
	},

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		PAGSEGURO_TOKEN: process.env.PAGSEGURO_TOKEN,
		PAGSEGURO_REDIRECT_URL: process.env.PAGSEGURO_REDIRECT_URL,
		PAGSEGURO_RETURN_URL: process.env.PAGSEGURO_RETURN_URL,
		PAGSEGURO_NOTIFICATIONS_URL: process.env.PAGSEGURO_NOTIFICATIONS_URL,
	},
});
