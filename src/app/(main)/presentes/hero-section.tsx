'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function HeroSection() {
	return (
		<div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-8">
			<div className="px-4 lg:px-0">
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: -100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
				>
					<h3 className="text-2xl font-semibold">Lista de presentes</h3>

					<p className="mt-4 text-justify">
						Dê uma olhadinha em nossa lista de presentes. Ficaremos muito felizes com sua contribuição.
					</p>
				</motion.div>
			</div>

			<motion.div
				animate={{ opacity: 1, x: 0 }}
				initial={{ opacity: 0, x: 100 }}
				transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
			>
				<Image
					src="/wedding-gifts.png"
					width={1440}
					height={520}
					quality={100}
					alt=""
					className="h-80 object-cover lg:h-96 lg:rounded-lg"
				/>
			</motion.div>
		</div>
	);
}
