'use client';

import { Guest } from '@prisma/client';

import { TableCell, TableRow } from '@/components/ui/table';

interface IOrderTableRowProps {
	guest: Guest;
}

export function GuestTableRow({ guest }: IOrderTableRowProps) {
	return (
		<TableRow>
			<TableCell>{guest.name}</TableCell>
			<TableCell className="font-mono text-xs font-medium">{guest.email}</TableCell>
			<TableCell className="text-muted-foreground">{guest.phone}</TableCell>
			<TableCell>{guest.familyMembersAmount}</TableCell>
		</TableRow>
	);
}
