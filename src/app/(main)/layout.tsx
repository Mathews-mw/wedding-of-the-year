import { ReactNode } from 'react';

import { Header } from '@/components/Header';

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen w-full text-slate-500">
			<Header />

			<main className="mx-auto mb-8 flex min-h-screen max-w-[1440px] flex-col px-40">
				{children}
			</main>
		</div>
	);
}
