import { env } from '../../env';

import ky from 'ky';

export const pagBankAPI = ky.create({
	prefixUrl: env.PAGBANK_API_URL,
	headers: {
		Authorization: `Bearer ${env.PAGBANK_TOKEN}`,
	},
});
