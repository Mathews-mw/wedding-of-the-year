'use client';

import { Timer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Separator } from './ui/separator';

interface TimeLeft {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
}

export function WeddingCountdown() {
	const targetDate = useMemo(() => {
		return new Date(2025, 4, 18, 18, 0, 0);
	}, []);

	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: '0',
		hours: '0',
		minutes: '0',
		seconds: '0',
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const diff = targetDate.getTime() - now.getTime();

			if (diff <= 0) {
				// Se o tempo já passou, zera o contador e para o intervalo
				clearInterval(intervalId);

				setTimeLeft({
					days: '0',
					hours: '0',
					minutes: '0',
					seconds: '0',
				});
			} else {
				const seconds = Math.floor((diff / 1000) % 60);
				const minutes = Math.floor((diff / (1000 * 60)) % 60);
				const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));

				setTimeLeft({
					days: String(days).padStart(2, '0'),
					hours: String(hours).padStart(2, '0'),
					minutes: String(minutes).padStart(2, '0'),
					seconds: String(seconds).padStart(2, '0'),
				});
			}
		}, 1000);

		// Cleanup do intervalo quando o componente desmontar
		return () => clearInterval(intervalId);
	}, [targetDate]);

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex items-center gap-2">
				<Timer className="size-6 animate-pulse text-rose-400" />
				<h4>Contagem para o grande dia</h4>
			</div>

			<div className="bg-primary-foreground flex h-20 w-min items-center justify-center gap-4 rounded-lg p-4 shadow-md">
				<div className="flex flex-col items-center">
					<span className="text-lg font-bold">{timeLeft.days}</span>
					<span className="text-sm font-light">Dias</span>
				</div>

				<Separator orientation="vertical" className="bg-main/50 h-16 w-2" />

				<div className="flex flex-col items-center">
					<span className="text-lg font-bold">{timeLeft.hours}</span>
					<span className="text-sm font-light">Horas</span>
				</div>

				<Separator orientation="vertical" className="bg-main/50 h-16 w-2" />

				<div className="flex flex-col items-center">
					<span className="text-lg font-bold">{timeLeft.minutes}</span>
					<span className="text-sm font-light">Minutos</span>
				</div>

				<Separator orientation="vertical" className="bg-main/50 h-16 w-2" />

				<div className="flex flex-col items-center">
					<span className="text-lg font-bold">{timeLeft.seconds}</span>
					<span className="text-sm font-light">Segundos</span>
				</div>
			</div>
		</div>
	);
}
