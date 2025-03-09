import { Product } from '@prisma/client';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	available: boolean;
}

export const mockProductList: Product[] = [
	{
		id: '64a3d374-3c41-477a-8ad7-e3d5efac1cf0',
		title: 'Viagem',
		description: 'Dê a felicidade para o casal de conhecer novos lugares para aproveitarem o momento de recém casados.',
		image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080',
		price: 550.0,
		available: true,
		amount: 1,
	},
	{
		id: 'ea387de1-4483-4109-a02c-3ff6df35460f',
		title: 'Jantar na cidade',
		description: 'Que tal presentear o casal com um jantar em um belo restaurante?',
		price: 150.0,
		image: 'https://images.unsplash.com/photo-1529516222410-a269d812f320',
		available: true,
		amount: 3,
	},
	{
		id: 'ef75c83c-6c92-43da-bc94-4a2a95fd3f62',
		title: 'Geladeira',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5',
		price: 800.0,
		available: true,
		amount: 1,
	},
	{
		id: '2746e0d8-4083-4ecf-979c-d813e6ff571b',
		title: 'Kit Taças de vinho',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db',
		price: 50.65,
		available: false,
		amount: 3,
	},
	{
		id: '08dae937-570f-4870-94fa-6a35b47dc768',
		title: 'Álbum de Fotos do Casal',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e',
		price: 120.0,
		available: true,
		amount: 5,
	},
	{
		id: 'c9512da8-db01-4306-baa9-a88383dd8c0a',
		title: 'Vale presente',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1526614180703-827d23e7c8f2',
		price: 520.0,
		available: true,
		amount: 4,
	},
	{
		id: 'd7af6f6f-3d9c-46ab-961e-a3c5fda2e6d9',
		title: 'Compra moeda local',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1554768804-50c1e2b50a6e',
		price: 370.0,
		available: true,
		amount: 2,
	},
];
