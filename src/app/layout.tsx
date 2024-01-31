import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import { TanstackQueryClientProvider } from '@/providers/TanstackQueryClientProvider';

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
