import { OrderProduct, Product } from '@prisma/client';

interface IOrderProductDetails extends OrderProduct {
	product: Product;
}

interface IOrderDetails extends Order {
	orderProducts: Array<IOrderProductDetails>;
}
