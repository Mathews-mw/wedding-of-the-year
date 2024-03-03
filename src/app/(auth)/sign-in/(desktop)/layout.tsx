import Image from 'next/image';
import { ReactNode } from 'react';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-2 text-slate-600 antialiased">
			<div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-marsala/90 p-10">
				<div className="flex items-center gap-3 text-lg text-foreground">
					<Image src="/Logo.png" alt="Logo" height={32} width={32} />
					<span className="text-xl font-semibold text-slate-100">N | R</span>
				</div>

				<footer className="text-sm text-slate-100">
					Métricas Casamento &copy; listapresentesnr.shop - {new Date().getFullYear()}
				</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center">{children}</div>
		</div>
	);
}
