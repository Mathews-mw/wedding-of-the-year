'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import WeddingGifts from '../../../../public/wedding-gifts.png';
import { Button } from '@/components/Buttons';
import Link from 'next/link';

export default function PresentesPage() {
	return (
		<div className="mt-8">
			<div className="lg:grid lg:grid-cols-2 lg:gap-8 hiddenOnPhone:space-y-4">
				<div>
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: -100 }}
						transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					>
						<h3 className="text-2xl font-semibold hiddenOnPhone:px-2">Lista de presentes</h3>

						<div className="space-y-4">
							<p className="mt-4 text-justify hiddenOnPhone:px-2">
								Os presentes ficarão disponíveis em breve para compra. Enquanto isso, que tal
								montar sua <strong>lista de desejos</strong>? Lá você também pode conferir todos
								os presentes.
							</p>

							<Button>
								<Link href="/wishlist">Ir para lista de desejos</Link>
							</Button>
						</div>
					</motion.div>
				</div>

				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: 100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
				>
					<Image
						src={WeddingGifts}
						quality={100}
						alt=""
						className="h-72 object-cover opacity-50 blur-sm lg:h-96 lg:rounded-lg"
					/>
				</motion.div>
			</div>
		</div>
	);
}
