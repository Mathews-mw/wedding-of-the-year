'use client';

import { TabItem } from './tab-item';
import { TabsList } from '@/components/ui/tabs';

import { Gift, Receipt, TrendingUp, UserRoundCheck } from 'lucide-react';

export function TabsOptions() {
	return (
		<TabsList>
			<TabItem title="Vendas" value="report">
				<Receipt className="group-data-[state=active]:text-rose-400" />
			</TabItem>

			<TabItem title="Produtos" value="products">
				<Gift className="group-data-[state=active]:text-rose-400" />
			</TabItem>

			<TabItem title="Convidados" value="guests">
				<UserRoundCheck className="group-data-[state=active]:text-rose-400" />
			</TabItem>

			<TabItem title="Objetivos" value="goals">
				<TrendingUp className="group-data-[state=active]:text-rose-400" />
			</TabItem>
		</TabsList>
	);
}
