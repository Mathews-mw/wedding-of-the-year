/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { Caveat } from 'next/font/google';

import { ImageHeader } from './image-header';

import { Camera, Church, Clock5, Gift, MapPin, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProductList } from '@/data/mock-products-list';
import { WeddingCountdown } from '@/components/weeding-countdown';

const caveat = Caveat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'L & F | Home',
};

export default function Home() {
	const resumeGiftList = mockProductList.slice(0, 6);

	return (
		<div className="h-full space-y-6">
			<ImageHeader />

			<WeddingCountdown />

			<div className={twMerge(['font bg-main/30 px-4 py-8 text-2xl font-light lg:rounded-lg', caveat.className])}>
				<p className="indent-6">Queridos amigos e familiares,</p>

				<br />

				<p className="indent-6">
					É com grande alegria que compartilhamos o momento especial de nossas vidas: nosso casamento! Estamos ansiosos
					para celebrar esse dia único e mágico ao lado de cada um de vocês, criando memórias que durarão para sempre.
				</p>

				<br />

				<p className="indent-6">
					Para nos ajudar a preparar este dia de maneira especial, gostaríamos de contar com a sua presença. Pedimos
					gentilmente que confirmem a participação, para que possamos organizar todos os detalhes com carinho e cuidado.
				</p>

				<br />

				<p className="indent-6">
					Se precisarem de informações adicionais ou tiverem alguma dúvida, não hesitem em entrar em contato.
					Agradecemos desde já por fazerem parte deste capítulo importante em nossas vidas.
				</p>
			</div>

			<div className="space-y-4 px-4 py-4 lg:px-0">
				<div className="flex items-start space-x-3">
					<Church className="h-6 w-6" />
					<span className="text-xl font-semibold">Recepção</span>
				</div>

				<div className="gap-4 md:grid md:grid-cols-2">
					<div className="flex flex-col gap-4">
						<p className="text-wrap">
							O local do evento será no <strong>La Famiglia Cantina Italiana</strong>. Localizado em: Rua Cametá, 03 -
							Dom Pedro, Manaus - AM, 69040-410.
						</p>

						<div className="flex flex-col gap-2">
							<div className="flex gap-2 text-sm">
								<Clock5 className="h-4 w-4" />
								<p>
									Começará às <strong>18hrs</strong>. Chegue com 40 minutos de antecedência.
								</p>
							</div>

							<div className="flex gap-2 text-sm">
								<Camera className="h-4 w-4" />
								<p>
									Ajude-nos a <strong>eternizar</strong> esse dia tirando muitas fotos.
								</p>
							</div>

							<div className="flex gap-2 text-sm">
								<PartyPopper className="h-4 w-4" />
								<p>
									<strong>Divirta-se</strong> muito!
								</p>
							</div>
						</div>

						<Link
							href="https://maps.app.goo.gl/X1ky81ch1p8y2SQF6"
							target="_blank"
							className="flex w-min gap-2 font-semibold text-nowrap text-rose-400 hover:text-rose-300"
						>
							<MapPin className="h-5 w-5" />
							Veja a localização no mapa
						</Link>
					</div>

					<div className="flex justify-between gap-4">
						<img
							src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
							className="hidden max-w-64 rounded object-cover shadow-sm drop-shadow-sm md:block"
						/>
						<img
							src="https://images.unsplash.com/photo-1525772764200-be829a350797?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
							className="hidden max-w-64 rounded object-cover shadow-sm drop-shadow-sm lg:block"
						/>
					</div>
				</div>
			</div>

			<div className="lg:bg-background space-y-4 bg-rose-50 p-4 lg:p-0">
				<div className="flex items-start space-x-3">
					<Gift className="h-6 w-6" />
					<span className="text-xl font-semibold">Lista de presentes</span>
				</div>

				<div className="space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0">
					<div className="flex flex-col gap-4">
						<span>Que tal dá uma olhada na nossa lista de presentes?</span>

						<div className="flex w-full justify-center lg:justify-start">
							<Button>
								<Link href="/presentes">Conferir lista de presentes</Link>
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4">
						{resumeGiftList.map((gift) => {
							return (
								<div key={gift.id} className="">
									<img src={gift.image} alt={gift.title} className="h-full w-full rounded object-cover shadow-sm" />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
