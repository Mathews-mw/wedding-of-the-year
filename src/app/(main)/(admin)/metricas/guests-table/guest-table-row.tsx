'use client';

import dayjs from 'dayjs';
import { Guest } from '@prisma/client';

import { TableCell, TableRow } from '@/components/ui/table';
import { phoneFormatter } from '@/utils/phone-formatter';

interface IOrderTableRowProps {
	guest: Guest;
}

export function GuestTableRow({ guest }: IOrderTableRowProps) {
	const confirmedFormatted = dayjs(guest.createdAt).format('DD/MM/YYYY [-] HH:mm');
	const confirmedDistanceToNow = dayjs(guest.createdAt).fromNow();

	return (
		<TableRow>
			<TableCell>{guest.name}</TableCell>
			<TableCell>{guest.email}</TableCell>
			<TableCell>{phoneFormatter(guest.phone)}</TableCell>
			<TableCell>
				<time title={confirmedFormatted}>{confirmedDistanceToNow}</time>
			</TableCell>
		</TableRow>
	);
}
