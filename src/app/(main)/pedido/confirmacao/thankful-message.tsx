'use client';

import { useSearchParams } from 'next/navigation';

export function ThankfulMessage() {
	const searchParams = useSearchParams();

	const guestName = searchParams.get('guest');

	return (
		<>
			{guestName ? (
				<p className="text-center">
					{guestName}, gostaríamos de agradecer a você por contribuir com a lista de presentes.
					Ficamos muito felizes com a sua generosidade e participação.
				</p>
			) : (
				<p className="text-center">
					Gratidão total por contribuir com a nossa lista de presentes. Ficamos muito felizes
					com a sua generosidade e participação.
				</p>
			)}
		</>
	);
}
