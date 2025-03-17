'use client';

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

const signInForm = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignInPage() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
	});

	const router = useRouter();

	async function handleSignInForm(data: SignInForm) {
		try {
			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.ok === false && result.status === 401) {
				toast.error('Ops! Credenciais inválidas.');
				return;
			}

			router.replace('/metricas');
		} catch (error) {
			console.log('error: ', error);
			toast.error('Credenciais inválidas.');
		}
	}

	return (
		<div className="text-complementary-deep p-8">
			<Button variant="ghost" disabled={isSubmitting} className="text-foreground absolute top-8 right-8">
				<Link href="/">Voltar ao site</Link>
			</Button>

			<div className="flex w-[350px] flex-col justify-center gap-6 rounded-lg border p-6 shadow-md">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tighter">Métricas e Objetivos</h1>
					<p className="text-muted-foreground text-sm">Acompanhe as métricas e objetivos do seu casamento.</p>
				</div>

				<form onSubmit={handleSubmit(handleSignInForm)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">E-mail</Label>

						<div>
							<Input id="email" placeholder="Insira seu e-mail cadastrado" type="text" {...register('email')} />
							<small className="text-red-400">{errors.email?.message}</small>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="name">Senha</Label>

						<div>
							<Input id="name" placeholder="Insira sua senha" type="password" {...register('password')} />
							<small className="text-red-400">{errors.password?.message}</small>
						</div>
					</div>

					<Button type="submit" className="flex w-full gap-2" disabled={isSubmitting}>
						Acessar métricas
						{isSubmitting && <Loader2 className="animate-spin" />}
					</Button>
				</form>
			</div>
		</div>
	);
}
