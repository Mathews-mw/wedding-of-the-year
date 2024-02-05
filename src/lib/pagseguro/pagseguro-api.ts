import { env } from '@/env';
import axios from 'axios';

export const pagseguroAPI = axios.create({
	baseURL: 'https://sandbox.api.pagseguro.com',
	headers: {
		Authorization: `Bearer ${env.PAGSEGURO_TOKEN}`,
	},
});
