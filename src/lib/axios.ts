import axios from 'axios';

export const api = axios.create({
	baseURL: '/api',
	timeout: 30000,
});

api.interceptors.request.use(async (config) => {
	console.log('interceptors request: ', config.data);

	return config;
});

api.interceptors.response.use(async (config) => {
	console.log('interceptors response: ', config.data);

	return config;
});
