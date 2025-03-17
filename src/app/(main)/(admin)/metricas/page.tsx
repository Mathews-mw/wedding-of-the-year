'use client';

import { z } from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs } from '@/components/ui/tabs';
import { TabsOptions } from './tabs/tabs-options';
import { GoalsTabContent } from './tabs/goals-tab-content';
import { ReportTabContent } from './tabs/report-tab-content';
import { GuestsTabContent } from './tabs/guests-tab-content';
import { ProductsTabContent } from './tabs/products-tab-content';

export default function MetricsPage() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const currentTab = z.enum(['report', 'guests', 'goals', 'products']).parse(searchParams.get('tab') ?? 'report');

	function handleChangeTab(tab: 'report' | 'guests' | 'goals' | 'products') {
		params.forEach((_, key) => {
			params.delete(key);
		});

		params.set('tab', tab.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="mt-16 mb-4 flex flex-col gap-4 px-4 lg:mt-8 lg:px-0">
			<h1 className="text-xl font-semibold tracking-tight lg:text-2xl">Acompanhamento das métricas do casamento</h1>

			<Tabs
				defaultValue="report"
				value={currentTab}
				onValueChange={(value) => handleChangeTab(value as 'report' | 'guests' | 'goals' | 'products')}
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
						{currentTab === 'products' && <ProductsTabContent />}
					</motion.div>
				</AnimatePresence>
			</Tabs>
		</div>
	);
}
