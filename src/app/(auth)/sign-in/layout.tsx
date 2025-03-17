import Image from 'next/image';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	return (
		<div className={twMerge(['flex min-h-dvh antialiased', 'lg:grid lg:grid-cols-2 lg:p-0'])}>
			<div className="border-foreground/5 bg-main-light relative hidden h-full flex-col justify-between border-r p-10 lg:flex">
				<div className="text-foreground flex items-center gap-3 text-lg">
					<Image src="/Logo.png" alt="Logo" height={32} width={32} />
					<span className="text-complementary-deep text-xl font-semibold">F & L</span>
				</div>

				<footer className="text-complementary-deep text-sm">
					Métricas Casamento &copy; naolembroonomedosite.shop - {new Date().getFullYear()}
				</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center">{children}</div>
		</div>
	);
}
