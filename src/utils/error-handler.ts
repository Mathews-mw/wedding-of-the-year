import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function errorHandler(error: unknown) {
	if (error instanceof AxiosError) {
		return toast.error(error.response?.data.message, { duration: 5000 });
	}

	throw error;
}
