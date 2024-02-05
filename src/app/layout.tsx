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

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);

const nunitoSans = Nunito({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
	title: 'Wedding of the year',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br" className="min-h-screen antialiased">
			<body className={nunitoSans.className}>
				<TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>

				<Toaster richColors />
			</body>
		</html>
	);
}
