'use client';

import z from 'zod';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Button } from '@/components/Buttons';
import { Select } from '@/components/Form/Select';
import { SelectItem } from '@/components/Form/Select/SelectItem';
import { InputControl, InputRoot } from '@/components/Form/Input';

import LetsGetMarried from '../../../../public/lets-get-married.png';
import { InputMaskControl, InputMaskRoot } from '@/components/Form/InputMask';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	guests: z.string(),
	email: z
		.string()
		.email({ message: 'Preencha com um e-mail válido.' })
		.min(1, { message: 'Por favor, preencha o campo.' }),
	phone: z.string(),
});

export default function Presenca() {
	return (
		<div className="mt-8">
			<div className="grid grid-cols-2 gap-8">
				<div>
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: -100 }}
						transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					>
						<h3 className="text-2xl font-semibold">Confirme sua presença</h3>

						<p className="mt-4 text-justify">
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
						className="h-96 rounded-lg object-cover drop-shadow-lg"
					/>
				</motion.div>
			</div>

			<form className="mt-8 space-y-6 rounded-lg border border-slate-200 p-8 shadow-sm">
				<div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
					<label htmlFor="name" className="font-semibold">
						Nome completo
					</label>

					<InputRoot>
						<InputControl id="name" placeholder="Insira seu nome completo" required />
					</InputRoot>
				</div>

				<div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
					<label htmlFor="guests" className="font-semibold">
						Quantidade de familiares
					</label>

					<div className="max-w-48">
						<Select placeholder="Selecione um valor" required>
							<SelectItem value="0" text="0" />
							<SelectItem value="1" text="1" />
							<SelectItem value="2" text="2" />
							<SelectItem value="3" text="3" />
							<SelectItem value="4" text="5" />
							<SelectItem value="5" text="5" />
							<SelectItem value="6" text="6" />
						</Select>
					</div>
				</div>

				<div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
					<label htmlFor="email" className="font-semibold">
						E-mail
					</label>

					<InputRoot>
						<InputControl id="email" placeholder="maria@email.com" required />
					</InputRoot>
				</div>

				<div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
					<label htmlFor="phone" className="font-semibold">
						Telefone para contato
					</label>

					<InputMaskRoot>
						<InputMaskControl
							mask="(\92) 99999-9999"
							maskChar=" "
							maskPlaceholder={null}
							id="phone"
							placeholder="(99) 99999-9999"
						/>
					</InputMaskRoot>
				</div>

				<Button type="submit">Confirmar</Button>
			</form>
		</div>
	);
}
