'use client';

import { TabItem } from './tab-item';
import { TabsList } from '@/components/ui/tabs';

import { GanttChartSquare, TrendingUp } from 'lucide-react';

export function TabsOptions() {
	return (
		<TabsList>
			<TabItem title="Relatório de vendas" value="report">
				<GanttChartSquare className="h-5 w-5 group-data-[state=active]:text-rose-400" />
			</TabItem>

			<TabItem title="Objetivos" value="goals">
				<TrendingUp className="h-5 w-5 group-data-[state=active]:text-rose-400" />
			</TabItem>
		</TabsList>
	);
}
