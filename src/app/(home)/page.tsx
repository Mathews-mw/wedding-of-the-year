'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Libre_Baskerville } from 'next/font/google';
import { motion } from 'framer-motion';

import { Camera, Church, Clock5, Gift, MapPin, PartyPopper } from 'lucide-react';

import WeddingIllustration from '../../../public/wedding-illustration.jpg';
import Link from 'next/link';
import { Button } from '@/components/Buttons';
import { giftList } from '@/data/gift-list';

const libreBaskerville = Libre_Baskerville({
	subsets: ['latin'],
	weight: ['400', '700'],
});

export default function Home() {
	const resumeGiftList = giftList.slice(0, 6);

	return (
		<div className="h-full space-y-6">
			<div className="relative h-[520px] w-full">
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
						className="absolute left-0 top-0 -z-10 h-[520px] object-cover object-top"
					/>
				</motion.div>

				<div
					className={twMerge([
						libreBaskerville.className,
						'flex h-full w-full items-center justify-end text-slate-100',
					])}
				>
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: 150 }}
						transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
						className="flex h-full w-[50%] flex-col items-center justify-center space-y-2 pr-40 text-rose-400"
					>
						<span className="text-xl font-light">Naíla & Rodrigo</span>
						<div className="h-0.5 w-56 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200 shadow-sm" />
						<span className="text-lg">18 DE MAIO DE 2024</span>
					</motion.div>
				</div>
			</div>

			<div className="rounded-lg bg-rose-50 px-4 py-8">
				<p className="text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea eius maiores
					doloremque non facere nam fuga amet quae, neque beatae reprehenderit unde minima a,
					molestiae inventore! Labore, voluptatum. Tenetur! Lorem ipsum, dolor sit amet
					consectetur adipisicing elit. Sapiente voluptas nemo exercitationem. Natus cupiditate,
					ratione quasi eaque officia, velit aliquid dolorum at ipsum, reprehenderit voluptate.
					Reprehenderit deleniti et quaerat autem. Lorem ipsum dolor sit amet consectetur,
					adipisicing elit. Earum assumenda aut eaque velit, fugit officiis. Iure fugit optio
					delectus recusandae perferendis consequuntur veniam rerum ipsum distinctio! Aut
					praesentium animi nam!
				</p>
			</div>

			<div className="space-y-4">
				<a id="recepcao" className="hidden"></a>
				<div className="flex items-start space-x-3">
					<Church className="h-6 w-6" />
					<span className="text-xl font-semibold">Recepção</span>
				</div>
				<div className="grid grid-cols-2">
					<div className="flex flex-col space-y-4">
						<p>
							O local do evento será no <strong>Bella Flora</strong>. Localizado na rua Sergipe,
							número 47, Parque das Laranjeiras - CEP: 69058530.
						</p>

						<div className="flex flex-col gap-2">
							<span className="flex gap-2 text-sm">
								<Clock5 className="h-4 w-4" />
								Começará às <strong>17hrs</strong>. Chegue com 40 minutos de antecedência.
							</span>

							<span className="flex gap-2 text-sm">
								<Camera className="h-4 w-4" />
								Ajude-nos a <strong>eternizar</strong> esse dia tirando muitas fotos.
							</span>

							<span className="flex gap-2 text-sm">
								<PartyPopper className="h-4 w-4" />
								<strong>Divirta-se</strong> muito!
							</span>
						</div>

						<Link
							href="https://maps.app.goo.gl/7yUJ57xNHi1ctB6E7"
							target="_blank"
							className="flex w-min gap-2 text-nowrap font-semibold text-rose-400 hover:text-rose-300"
						>
							<MapPin className="h-5 w-5" />
							Veja a localização no mapa
						</Link>
					</div>

					<div className="flex justify-around">
						<Image
							src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							width={220}
							height={360}
							quality={100}
							alt=""
							className="rounded shadow-sm drop-shadow-sm"
						/>
						<Image
							src="https://images.unsplash.com/photo-1525772764200-be829a350797?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							width={220}
							height={360}
							quality={100}
							alt=""
							className="rounded shadow-sm drop-shadow-sm"
						/>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-start space-x-3">
					<Gift className="h-6 w-6" />
					<span className="text-xl font-semibold">Lista de presentes</span>
				</div>

				<div className="grid grid-cols-2">
					<div className="flex flex-col gap-4">
						<span>Que tal dá uma olhada na nossa lista de presentes?</span>

						<div>
							<Button>Conferir lista de presentes</Button>
						</div>
					</div>

					<div className="grid-cols-giftResumeTemplateColumns grid-rows-giftResumeTemplateRows grid gap-4">
						{resumeGiftList.map((gift) => {
							return (
								<div key={gift.id} className="">
									<img
										src={gift.image}
										className="h-full w-full rounded object-cover shadow-sm"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
