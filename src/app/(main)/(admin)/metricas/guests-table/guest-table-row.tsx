'use client';

import { Guest } from '@prisma/client';

import { TableCell, TableRow } from '@/components/ui/table';
import dayjs from 'dayjs';

interface IOrderTableRowProps {
	guest: Guest;
}

export function GuestTableRow({ guest }: IOrderTableRowProps) {
	const confirmedFormatted = dayjs(guest.created_at).format('DD/MM/YYYY [-] HH:mm');
	const confirmedDistanceToNow = dayjs(guest.created_at).fromNow();

	return (
		<TableRow>
			<TableCell>{guest.name}</TableCell>
			<TableCell>{guest.email}</TableCell>
			<TableCell>{guest.phone}</TableCell>
			<TableCell className="text-center">{guest.familyMembersAmount}</TableCell>
			<TableCell className="text-center">
				<time title={confirmedFormatted}>{confirmedDistanceToNow}</time>
			</TableCell>
		</TableRow>
	);
}
