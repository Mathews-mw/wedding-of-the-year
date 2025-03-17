import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
		const totalProducts = await prisma.product.aggregate({ _sum: { initialQuantity: true } });

		const orders = await prisma.order.findMany({
			where: {
				status: 'PAID',
			},
			include: {
				orderProducts: true,
			},
		});

		const totalRemaining = await prisma.product.count({
			where: {
				available: true,
			},
		});

		const totalPurchased = orders.reduce((amount, item) => {
			return (amount += item.orderProducts.length);
		}, 0);

		return Response.json({
			total_products: totalProducts._sum.initialQuantity,
			total_purchased: totalPurchased,
			total_remaining: totalRemaining,
		});
	} catch (error) {
		console.log('metrics products purchased route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
