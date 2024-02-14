'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Libre_Baskerville } from 'next/font/google';

import WeddingIllustration from '../../../../public/wedding-illustration.jpg';

const libreBaskerville = Libre_Baskerville({
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
});

export function ImageHeader() {
	return (
		<div className="relative h-96 w-full lg:h-[520px]">
			<motion.div
				animate={{ opacity: 1, x: 0 }}
				initial={{ opacity: 0, x: -100 }}
				transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
			>
				<Image
					src={WeddingIllustration}
					width={1440}
					height={520}
					quality={100}
					alt="wedding illustration"
					className="absolute left-0 top-0 -z-10 h-96 object-cover object-top lg:h-[520px]"
				/>
			</motion.div>

			<div
				className={twMerge([
					libreBaskerville.className,
					'flex h-full w-full justify-end pt-4 text-slate-100 lg:items-center lg:pt-0',
				])}
			>
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: 150 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					className="flex w-[50%] flex-col items-center space-y-2 pr-10 text-rose-400 lg:pr-40"
				>
					<span className="text-nowrap text-sm font-light lg:text-xl">Naíla & Rodrigo</span>
					<div className="h-px  w-40 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200 shadow-sm lg:w-56" />
					<span className="text-nowrap text-xs lg:text-lg">18 DE MAIO DE 2024</span>
				</motion.div>
			</div>
		</div>
	);
}
