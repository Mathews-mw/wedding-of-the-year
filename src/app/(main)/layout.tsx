import { ReactNode } from 'react';

import { Header } from '@/components/header';

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="text-complementary-deep w-full">
			<Header />

			<main className="flex flex-col lg:mx-auto lg:mb-8 lg:max-w-[1440px] lg:px-40">{children}</main>
		</div>
	);
}
