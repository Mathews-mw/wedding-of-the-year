import Image from 'next/image';
import { ReactNode } from 'react';

export default async function SessionMobileLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-marsala/90 text-slate-600 antialiased">{children}</div>
	);
}
