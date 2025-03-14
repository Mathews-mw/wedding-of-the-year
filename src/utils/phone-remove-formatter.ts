export function phoneRemoveFormatter(value: string) {
	return value.trim().replace(' ', '').replace('-', '').replace('(', '').replace(')', '');
}
