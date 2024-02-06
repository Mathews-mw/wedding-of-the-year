'use client';

import z from 'zod';
import Image from 'next/image';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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

import LetsGetMarried from '../../../../public/lets-get-married.png';

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

export default function Presenca() {
	const [loading, setLoading] = useState(false);

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

	async function handleConfirmationFormSubmit(data: FormData) {
		try {
			setLoading(true);

			const { data: result } = await api.post('/presence', {
				name: data.name,
				email: data.email,
				phone: data.phone,
				family_members_amount: data.familyMembersAmount,
			});

			setLoading(false);
			reset();

			router.push(`/presenca/confirmacao?guest=${data.name}`);
			toast.success(`${result.guest}, sua confirmação foi realizada com sucesso.`, {
				duration: 5000,
			});
		} catch (error) {
			console.log(error);
			setLoading(false);
			errorHandler(error);
		}
	}

	return (
		<div className="mt-8">
			<div className="lg:grid lg:grid-cols-2 lg:gap-8 hiddenOnPhone:space-y-4">
				<div>
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: -100 }}
						transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					>
						<h3 className="text-2xl font-semibold hiddenOnPhone:px-2">Confirme sua presença</h3>

						<p className="mt-4 text-justify hiddenOnPhone:px-2">
							Chegou a hora de você confirmar sua presença nesse evento especial. Por favor,
							preencha todos os campos a baixo, informando a quantidade de familiares que irão
							lhe acompanhar, caso seja necessário, e não esqueça de colocar um e-mail válido
							para receber a sua confirmação de presença. Ficaremos muito felizes de recebê-lo
							em nossa cerimônia.
						</p>
					</motion.div>
				</div>

				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: 100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
				>
					<Image
						src={LetsGetMarried}
						quality={100}
						alt=""
						className="h-72 object-cover drop-shadow-lg lg:h-96 lg:rounded-lg"
					/>
				</motion.div>
			</div>

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
								mask="(\92) 99999-9999"
								maskChar=" "
								maskPlaceholder={null}
								id="phone"
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
						disabled={isSubmitting || loading}
					>
						Confirmar
						{isSubmitting && <Spinner />}
					</Button>
				</div>
			</form>
		</div>
	);
}
