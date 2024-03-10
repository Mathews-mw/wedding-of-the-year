'use server';

import { cookies } from 'next/headers';

export async function getCookie(
	cookieName: string
): Promise<{ name: string; value: string } | null> {
	const myCookies = await cookies();

	const storegedCookie = await myCookies.get(cookieName);

	if (!storegedCookie) {
		return null;
	}

	return storegedCookie;
}
