'use client';

import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { api } from '@/lib/axios';
import { Button } from '@/components/Buttons';
import { Select } from '@/components/Form/Select';
import { errorHandler } from '@/utils/error-handler';
import { Spinner } from '@/components/Loaders/Spinner';
import { SelectItem } from '@/components/Form/Select/SelectItem';
import { InputControl, InputRoot } from '@/components/Form/Input';
import { InputMaskControl, InputMaskRoot } from '@/components/Form/InputMask';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	familyMembersAmount: z
		.string({ required_error: 'Por favor, preencha o campo.' })
		.min(1, { message: 'Por favor, preencha o campo.' }),
	email: z
		.string()
		.email({ message: 'Preencha com um e-mail válido.' })
		.min(1, { message: 'Por favor, preencha o campo.' }),
	phone: z
		.string()
		.min(1, { message: 'Por favor, preencha o campo.' })
		.transform((value) => {
			return value.replace(/\s/g, '').replace('(', '').replace(')', '').replace('-', '');
		}),
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
		mutationFn: async (data: FormData) =>
			await api.post('/presence', {
				name: data.name,
				email: data.email,
				phone: data.phone,
				family_members_amount: data.familyMembersAmount,
			}),
	});

	async function handleConfirmationFormSubmit(data: FormData) {
		try {
			const { data: result } = await confirmationFn(data);

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
		<form
			onSubmit={handleSubmit(handleConfirmationFormSubmit)}
			className="mt-8 space-y-6 rounded-lg border border-slate-200 p-8 shadow-sm hiddenOnPhone:mx-2 hiddenOnPhone:mb-4 hiddenOnPhone:p-4"
		>
			<div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
				<label htmlFor="name" className="font-semibold">
					Nome completo
				</label>

				<div>
					<InputRoot>
						<InputControl
							id="name"
							placeholder="Insira seu nome completo"
							{...register('name')}
						/>
					</InputRoot>
					<small className="text-red-400">{errors.name?.message}</small>
				</div>
			</div>
			<div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
				<label htmlFor="guests" className="font-semibold">
					Quantidade de familiares
				</label>

				<div className="max-w-48">
					<Controller
						name="familyMembersAmount"
						control={control}
						render={({ field }) => {
							return (
								<Select
									placeholder="Selecione um valor"
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectItem value="0" text="0" />
									<SelectItem value="1" text="1" />
									<SelectItem value="2" text="2" />
									<SelectItem value="3" text="3" />
									<SelectItem value="4" text="5" />
									<SelectItem value="5" text="5" />
									<SelectItem value="6" text="6" />
								</Select>
							);
						}}
					/>
					<small className="text-red-400">{errors.familyMembersAmount?.message}</small>
				</div>
			</div>
			<div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
				<label htmlFor="email" className="font-semibold">
					E-mail
				</label>

				<div>
					<InputRoot>
						<InputControl
							id="email"
							type="email"
							placeholder="maria@email.com"
							{...register('email')}
						/>
					</InputRoot>
					<small className="text-red-400">{errors.email?.message}</small>
				</div>
			</div>
			<div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
				<label htmlFor="phone" className="font-semibold">
					Telefone para contato
				</label>

				<div>
					<InputMaskRoot>
						<InputMaskControl
							mask="(99) 99999-9999"
							maskChar=" "
							maskPlaceholder={null}
							id="phone"
							type="tel"
							placeholder="(99) 99999-9999"
							{...register('phone')}
						/>
					</InputMaskRoot>
					<small className="text-red-400">{errors.phone?.message}</small>
				</div>
			</div>

			<div className="flex w-full lg:justify-end">
				<Button
					type="submit"
					className="hiddenOnPhone::w-full flex items-center justify-center gap-2"
					disabled={isSubmitting || isPending}
				>
					Confirmar
					{isSubmitting && <Spinner />}
				</Button>
			</div>
		</form>
	);
}
