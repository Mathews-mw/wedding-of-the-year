'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Search, X } from 'lucide-react';

const productsFiltersSchema = z.object({
	name: z.optional(z.string()),
});

type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>;

export function ProductTableFilters() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const perPage = searchParams.get('perPage') ?? '10';
	const name = searchParams.get('name');

	const { handleSubmit, register, reset } = useForm<ProductsFiltersSchema>({
		resolver: zodResolver(productsFiltersSchema),
		defaultValues: {
			name: name ?? '',
		},
	});

	const [perPageValue, setPerPageValue] = useState(perPage);

	function handleFilter({ name }: ProductsFiltersSchema) {
		if (name) {
			params.set('name', name);
		} else {
			params.delete('name');
		}

		replace(`${pathname}?${params.toString()}`);
	}

	function handleClearFilters() {
		params.set('page', '1');
		params.set('perPage', '10');
		params.delete('name');

		reset({
			name: '',
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

			<Input placeholder="Nome" className="h-8 w-auto" {...register('name')} />

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
