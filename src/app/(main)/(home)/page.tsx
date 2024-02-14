/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Caveat } from 'next/font/google';

import { ImageHeader } from './ImageHeader';
import { giftList } from '@/data/gift-list';
import { Button } from '@/components/Buttons';

import { Camera, Church, Clock5, Gift, MapPin, PartyPopper } from 'lucide-react';

const caveat = Caveat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export default function Home() {
	const resumeGiftList = giftList.slice(0, 6);

	return (
		<div className="h-full space-y-6">
			<ImageHeader />

			<div
				className={twMerge([
					'font bg-rose-50 px-4 py-8 text-2xl font-light lg:rounded-lg',
					caveat.className,
				])}
			>
				<p className="indent-6">Queridos amigos e familiares,</p>

				<br />

				<p className="indent-6">
					É com grande alegria que compartilhamos o momento especial de nossas vidas: nosso
					casamento! Estamos ansiosos para celebrar esse dia único e mágico ao lado de cada um
					de vocês, criando memórias que durarão para sempre.
				</p>

				<br />

				<p className="indent-6">
					Para nos ajudar a preparar este dia de maneira especial, gostaríamos de contar com a
					sua presença. Pedimos gentilmente que confirmem a participação, para que possamos
					organizar todos os detalhes com carinho e cuidado.
				</p>

				<br />

				<p className="indent-6">
					Se precisarem de informações adicionais ou tiverem alguma dúvida, não hesitem em
					entrar em contato. Agradecemos desde já por fazerem parte deste capítulo importante em
					nossas vidas.
				</p>

				<br />

				<div className="flex w-full flex-col items-center justify-center">
					<small>Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.</small>
					<small>(Colossenses 3:14)</small>
				</div>
			</div>

			<div className="space-y-4 hiddenOnPhone:p-4">
				<div className="flex items-start space-x-3">
					<Church className="h-6 w-6" />
					<span className="text-xl font-semibold">Recepção</span>
				</div>

				<div className="lg:grid lg:grid-cols-2">
					<div className="flex flex-col gap-4">
						<p className="text-wrap">
							O local do evento será no <strong>Bella Flora</strong>. Localizado na rua Sergipe,
							número 47, Parque das Laranjeiras - CEP: 69058530.
						</p>

						<div className="flex flex-col gap-2">
							<div className="flex gap-2 text-sm">
								<Clock5 className="h-4 w-4" />
								<p>
									Começará às <strong>17hrs</strong>. Chegue com 40 minutos de antecedência.
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
							href="https://maps.app.goo.gl/7yUJ57xNHi1ctB6E7"
							target="_blank"
							className="flex w-min gap-2 text-nowrap font-semibold text-rose-400 hover:text-rose-300"
						>
							<MapPin className="h-5 w-5" />
							Veja a localização no mapa
						</Link>
					</div>

					<div className="flex justify-around hiddenOnPhone:hidden">
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

			<div className="space-y-4 hiddenOnPhone:bg-rose-50 hiddenOnPhone:p-4">
				<div className="flex items-start space-x-3">
					<Gift className="h-6 w-6" />
					<span className="text-xl font-semibold">Lista de presentes</span>
				</div>

				<div className="lg:grid lg:grid-cols-2">
					<div className="flex flex-col gap-4">
						<span>Que tal dá uma olhada na nossa lista de presentes?</span>

						<div className="flex w-full justify-center lg:justify-start">
							<Button>
								<Link href="/presentes">Conferir lista de presentes</Link>
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-giftResumeTemplateColumns grid-rows-giftResumeTemplateRows gap-4 hiddenOnPhone:hidden">
						{resumeGiftList.map((gift) => {
							return (
								<div key={gift.id} className="">
									<img
										src={gift.image}
										alt={gift.title}
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
