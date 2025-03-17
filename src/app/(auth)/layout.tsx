import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(nextAuthOptions);

	if (session) {
		redirect('/presentes');
	}

	return <>{children}</>;
}
