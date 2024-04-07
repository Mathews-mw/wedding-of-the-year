'use client';

import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs } from '@/components/ui/tabs';
import { TabsOptions } from './tabs/tabs-options';
import { GoalsTabContent } from './tabs/goals-tab-content';
import { ReportTabContent } from './tabs/report-tab-content';
import { GuestsTabContent } from './tabs/guests-tab-content';

export default function MetricsPage() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const currentTab = z
		.enum(['report', 'guests', 'goals'])
		.parse(searchParams.get('tab') ?? 'report');

	function handleChangeTab(tab: 'report' | 'guests' | 'goals') {
		params.set('tab', tab.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	console.log('current tab:', currentTab);

	return (
		<div className="mt-8 flex flex-col gap-4 hiddenOnPhone:px-2">
			<h1 className="text-xl font-semibold tracking-tight lg:text-2xl">
				Acompanhamento das métricas do casamento
			</h1>

			<Tabs
				defaultValue="report"
				value={currentTab}
				onValueChange={(value) => handleChangeTab(value as 'report' | 'guests' | 'goals')}
			>
				<TabsOptions />

				<AnimatePresence mode="wait">
					<motion.div
						key={currentTab}
						initial={{ x: currentTab === 'report' ? 100 : -100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: currentTab === 'report' ? 100 : 0, opacity: 0 }}
						transition={{ duration: 0.2, type: 'tween' }}
					>
						{currentTab === 'report' && <ReportTabContent />}
						{currentTab === 'guests' && <GuestsTabContent />}
						{currentTab === 'goals' && <GoalsTabContent />}
					</motion.div>
				</AnimatePresence>
			</Tabs>
		</div>
	);
}
