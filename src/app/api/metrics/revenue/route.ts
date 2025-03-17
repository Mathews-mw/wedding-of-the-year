import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
		const products = await prisma.product.findMany();

		const productsTotalSum = products.reduce((amount, product) => {
			return (amount += product.price * product.initialQuantity);
		}, 0);

		const totalProductsPurchased = await prisma.orderProduct.findMany({
			where: {
				order: {
					status: 'PAID',
				},
			},
		});

		const purchasesTotalSum = totalProductsPurchased.reduce((amount, item) => {
			return (amount += item.price * item.itemQuantity);
		}, 0);

		return Response.json({
			products_total_sum: productsTotalSum,
			purchases_total_sum: Number(purchasesTotalSum.toFixed(2)),
		});
	} catch (error) {
		console.log('metrics revenue route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
