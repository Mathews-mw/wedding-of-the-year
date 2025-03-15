'use client';

import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Loader2 } from 'lucide-react';
import { PhoneInput } from '@/components/phone-input';
import { confirmPresence } from '@/app/api/@requests/confirm-presence';
import { errorHandler } from '@/app/api/@requests/error-handler/error-handler';
import { phoneRemoveFormatter } from '@/utils/phone-remove-formatter';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	email: z
		.string()
		.email({ message: 'Preencha com um e-mail válido.' })
		.min(1, { message: 'Por favor, preencha o campo.' }),
	phone: z
		.string({ required_error: 'Por favor, preencha o campo.' })
		.min(15, { message: 'Por favor, informe um telefone válido.' }),
});

type FormData = z.infer<typeof formSchema>;

export function ConfirmationForm() {
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	const { mutateAsync: confirmationFn, isPending } = useMutation({
		mutationFn: confirmPresence,
	});

	async function handleConfirmationFormSubmit(data: FormData) {
		try {
			const result = await confirmationFn({
				name: data.name,
				email: data.email,
				phone: phoneRemoveFormatter(data.phone),
			});

			reset();
			toast.success(`${result.guest}, sua confirmação foi realizada com sucesso.`, {
				duration: 5000,
			});

			router.push(`/presenca/confirmacao?guest=${data.name}`);
		} catch (error) {
			console.log(error);
			errorHandler(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(handleConfirmationFormSubmit)} className="mt-8 space-y-6 rounded-lg border p-8 shadow">
			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-6">
				<label htmlFor="name" className="font-semibold">
					Nome completo
				</label>

				<div className="col-span-5">
					<Input id="name" placeholder="Insira seu nome completo" {...register('name')} />
					<small className="text-red-400">{errors.name?.message}</small>
				</div>
			</div>

			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-6">
				<label htmlFor="email" className="font-semibold">
					E-mail
				</label>

				<div className="col-span-5">
					<Input id="email" type="email" placeholder="Informe um e-mail válido" {...register('email')} />
					<small className="text-red-400">{errors.email?.message}</small>
				</div>
			</div>

			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-6">
				<label htmlFor="phone" className="font-semibold">
					Telefone
				</label>

				<div className="col-span-5">
					<Controller
						name="phone"
						control={control}
						render={({ field }) => {
							return <PhoneInput id="phone" value={field.value} onChange={field.onChange} />;
						}}
					/>
					<small className="text-red-400">{errors.phone?.message}</small>
				</div>
			</div>

			<div className="flex w-full lg:justify-end">
				<Button type="submit" className="flex items-center justify-center gap-2" disabled={isSubmitting}>
					Confirmar
					{isSubmitting && <Loader2 className="animate-spin" />}
				</Button>
			</div>
		</form>
	);
}
