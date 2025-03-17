import { Goals } from '../goals';
import { TabsContent } from '@/components/ui/tabs';

export function GoalsTabContent() {
	return (
		<TabsContent value="goals" className="mt-8">
			<Goals />
		</TabsContent>
	);
}
