import './globals.css';
import 'react-modern-drawer/dist/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import { TanstackQueryClientProvider } from '@/providers/TanstackQueryClientProvider';
import { NextAuthSessionProvider } from '@/providers/SessionProvider';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);

const nunitoSans = Nunito({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'N | R',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br" className="min-h-screen antialiased">
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />

			<body className={nunitoSans.className}>
				<NextAuthSessionProvider>
					<TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
				</NextAuthSessionProvider>

				<Toaster richColors />
			</body>
		</html>
	);
}
