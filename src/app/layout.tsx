import './globals.css';
import 'dayjs/locale/pt-br';

import dayjs from 'dayjs';
import { Toaster } from 'sonner';
import utc from 'dayjs/plugin/utc';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CartContextProvider } from '@/context/cart-context';
import { TanstackQueryClientProvider } from '@/providers/tanstack-query-client-provider';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);

const nunitoSans = Nunito({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'L & F | Casamento do ano',
	description:
		' Site de casamento que oferece uma maneira fácil e conveniente para os noivos compartilharem sua lista de presentes e detalhes do casamento com os convidados. Além disso, o site oferece uma forma segura para os convidados comprarem presentes.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />

			<body className={`${nunitoSans.className} antialiased`}>
				<TanstackQueryClientProvider>
					<CartContextProvider>{children}</CartContextProvider>
				</TanstackQueryClientProvider>

				<Toaster richColors closeButton duration={1000 * 10} />
			</body>
		</html>
	);
}
