'use client';

import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TOrderStatus } from '@/app/api/@requests/listing-orders';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Search, X } from 'lucide-react';

const ordersFiltersSchema = z.object({
	customerName: z.string().optional(),
	status: z
		.enum(['AUTHORIZED', 'PAID', 'IN_ANALYSIS', 'DECLINED', 'CANCELED', 'AWAITING', 'CONFIRMED', 'all'])
		.optional(),
});

type OrdersFiltersSchema = z.infer<typeof ordersFiltersSchema>;

export function OrderTableFilters() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const perPage = searchParams.get('perPage') ?? '10';
	const customerName = searchParams.get('customerName');
	const status = searchParams.get('status') ?? undefined;

	const { control, handleSubmit, register, reset } = useForm<OrdersFiltersSchema>({
		resolver: zodResolver(ordersFiltersSchema),
		defaultValues: {
			customerName: customerName ?? '',
			status: (status as TOrderStatus) ?? 'all',
		},
	});

	const [perPageValue, setPerPageValue] = useState(perPage);

	function handleFilter({ customerName, status }: OrdersFiltersSchema) {
		if (customerName) {
			params.set('customerName', customerName);
		} else {
			params.delete('customerName');
		}

		if (status) {
			params.set('status', status);
		} else {
			params.delete('status');
		}

		replace(`${pathname}?${params.toString()}`);
	}

	function handleClearFilters() {
		params.set('page', '1');
		params.set('perPage', '10');
		params.delete('status');
		params.delete('customerName');

		reset({
			customerName: '',
			status: 'all',
		});
		setPerPageValue('10');

		replace(`${pathname}?${params.toString()}`);
	}

	useEffect(() => {
		if (perPageValue) {
			params.set('perPage', perPageValue);
		} else {
			params.delete('perPage');
		}

		replace(`${pathname}?${params.toString()}`);
	}, [perPageValue]);

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:gap-2 lg:p-0"
		>
			<span className="text-sm font-semibold">Filtros:</span>

			<Input placeholder="Nome" className="h-8 w-auto" {...register('customerName')} />

			<Controller
				name="status"
				control={control}
				render={({ field }) => {
					return (
						<Select
							defaultValue="all"
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}
							disabled={field.disabled}
						>
							<SelectTrigger className="h-8 w-full lg:w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos status</SelectItem>
								<SelectItem value="AUTHORIZED">Autorizada</SelectItem>
								<SelectItem value="CANCELED">Cancelada</SelectItem>
								<SelectItem value="IN_ANALYSIS">Em análise</SelectItem>
								<SelectItem value="PAID">Pago</SelectItem>
								<SelectItem value="DECLINED">Recusada</SelectItem>
							</SelectContent>
						</Select>
					);
				}}
			/>

			<Select name="perPage" defaultValue="10" value={perPageValue} onValueChange={(value) => setPerPageValue(value)}>
				<SelectTrigger className="h-8 w-full lg:w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="10">10 itens por páginas</SelectItem>
					<SelectItem value="20">20 itens por páginas</SelectItem>
					<SelectItem value="30">30 itens por páginas</SelectItem>
					<SelectItem value="40">40 itens por páginas</SelectItem>
					<SelectItem value="50">50 itens por páginas</SelectItem>
				</SelectContent>
			</Select>

			<Button type="submit" variant="secondary" size="xs">
				<Search className="mr-2 h-4 w-4" />
				Filtrar resultados
			</Button>

			<Button type="button" variant="ghost" size="xs" onClick={() => handleClearFilters()}>
				<X className="mr-2 h-4 w-4" />
				Limpar filtros
			</Button>
		</form>
	);
}
