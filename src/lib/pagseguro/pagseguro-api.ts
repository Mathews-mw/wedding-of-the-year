import axios from 'axios';
import { env } from '@/env';

export const pagseguroAPI = axios.create({
	baseURL: env.PAGSEGURO_API_URL,
	headers: {
		Authorization: `Bearer ${env.PAGSEGURO_TOKEN}`,
	},
});
