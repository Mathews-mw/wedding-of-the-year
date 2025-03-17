import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import NextAuth, { DefaultSession, Account, User, Session } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			password?: string;
			isAdmin?: boolean;
		} & DefaultSession['user'];
	}

	interface User {
		password?: string;
		isAdmin?: boolean;
	}
}

declare module 'next-auth/adapters' {
	interface AdapterUser {
		isAdmin?: boolean;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		isAdmin?: boolean;
	}
}
