import { ReactNode } from 'react';

import { Header } from '@/components/Header';

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full text-slate-600">
			<Header />

			<main className="flex flex-col lg:mx-auto lg:mb-8 lg:max-w-[1440px] lg:px-40">
				{children}
			</main>
		</div>
	);
}
