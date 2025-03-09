export class ApiExceptionsError extends Error {
	constructor(message?: string) {
		super(message ?? 'Ocorreu um erro ao tentar processar a requisição');
	}
}
