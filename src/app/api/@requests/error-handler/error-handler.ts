import { toast } from 'sonner';
import { ApiExceptionsError } from './api-exceptions-error';

export function errorHandler(error: unknown) {
	if (error instanceof ApiExceptionsError) {
		toast.error(error.message);
	}

	console.warn('Unexpected request error: ', error);
	throw error;
}
