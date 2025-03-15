'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

import LetsGetMarried from '@/../public/lets-get-married.png';

export function HeroSection() {
	return (
		<div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-8">
			<div>
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: -100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					className="px-4 lg:px-0"
				>
					<h3 className="text-2xl font-semibold">Confirme sua presença</h3>

					<p className="mt-4 text-justify">
						Chegou a hora de você confirmar sua presença nesse evento especial. Por favor, preencha todos os campos a
						baixo, informando a quantidade de familiares que irão lhe acompanhar, caso seja necessário, e não esqueça de
						colocar um e-mail válido para receber a sua confirmação de presença. Ficaremos muito felizes de recebê-lo em
						nossa cerimônia.
					</p>
				</motion.div>
			</div>

			<motion.div
				animate={{ opacity: 1, x: 0 }}
				initial={{ opacity: 0, x: 100 }}
				transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
			>
				<Image
					src={LetsGetMarried}
					quality={100}
					alt=""
					className="h-72 object-cover drop-shadow-lg lg:h-96 lg:rounded-lg"
				/>
			</motion.div>
		</div>
	);
}
