'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { Libre_Baskerville } from 'next/font/google';
import useMediaQuery from '@/utils/hooks/use-media-query';

const libreBaskerville = Libre_Baskerville({
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
});

export function ImageHeader() {
	const { width } = useMediaQuery();

	console.log('width: ', width);

	return (
		<div className="relative h-80 w-full lg:h-[520px]">
			<motion.div
				animate={{ opacity: 1, x: 0 }}
				initial={{ opacity: 0, x: -100 }}
				transition={{ duration: 3, ease: 'easeIn', type: 'spring' }}
			>
				<Image
					src="/wedding-illustration.jpg"
					width={1440}
					height={520}
					quality={100}
					alt="wedding illustration"
					className="absolute top-0 left-0 -z-10 h-80 object-cover object-top lg:h-[520px]"
				/>
			</motion.div>

			{/* <div
				className={twMerge([libreBaskerville.className, 'flex h-full w-full justify-end pt-4 lg:items-center lg:pt-0'])}
			></div> */}
			<motion.div
				animate={{ opacity: 1, x: 0, y: 0 }}
				initial={{ opacity: 0, x: 150 }}
				transition={{ duration: 3, ease: 'easeIn', type: 'spring' }}
				className={twMerge([
					libreBaskerville.className,
					'absolute top-[50%] right-1/9 flex flex-col items-center space-y-2 lg:right-1/5',
				])}
			>
				<div className="flex w-min flex-col items-center justify-center space-y-2 rounded-lg bg-rose-100/65 px-4 py-2">
					<span className="text-sm font-light text-nowrap lg:text-xl">Fábio & Laura</span>
					<div className="h-px w-full bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 shadow-sm" />
					<span className="text-xs text-nowrap lg:text-lg">18 DE MAIO DE 2024</span>
				</div>
			</motion.div>
		</div>
	);
}
