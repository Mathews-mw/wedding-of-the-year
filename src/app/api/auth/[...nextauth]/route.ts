import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ISessionResponse {
	user: {
		id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	};
	token: string;
}

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const response = await fetch(`${env.APP_URL}/api/session`, {
					method: 'POST',
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
					headers: {
						'content-type': 'application/json',
					},
				});

				if (!response.ok) {
					return null;
				}

				const data: ISessionResponse = await response.json();

				return {
					id: data.user.id,
					name: data.user.name,
					email: data.user.email,
					isAdmin: data.user.isAdmin,
				};
			},
		}),
	],
	secret: `${env.NEXTAUTH_SECRET}`,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	callbacks: {
		async jwt({ token, trigger, user, session }) {
			console.log('jwt user: ', user);
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.isAdmin = user.isAdmin;
			}

			if (trigger === 'signIn') {
				token.isAdmin = user.isAdmin;
			}
			if (trigger === 'update' && session?.name) {
				token.name = session.name;
			}
			return token;
		},

		async session({ session, token, newSession, user, trigger }) {
			if (trigger === 'update' && newSession?.name) {
				session.user.name = newSession.name;
			}
			if (token) {
				if (token.email && token.name && token.sub && token.isAdmin) {
					session.user.id = token.sub;
					session.user.name = token.name;
					session.user.email = token.email;
					session.user.isAdmin = token.isAdmin;
				}
			}

			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
