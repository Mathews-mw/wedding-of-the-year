export interface IGift {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	available: boolean;
}

export const giftList: IGift[] = [
	{
		id: '64a3d374-3c41-477a-8ad7-e3d5efac1cf0',
		title: 'Viagem',
		description:
			'Dê a felicidade para o casal de conhecer novos lugares para aproveitarem o momento de recém casados.',
		image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080',
		price: 550.0,
		available: true,
	},
	{
		id: 'ea387de1-4483-4109-a02c-3ff6df35460f',
		title: 'Jantar na cidade',
		description: 'Que tal presentear o casal com um jantar em um belo restaurante?',
		price: 150.0,
		image: 'https://images.unsplash.com/photo-1529516222410-a269d812f320',
		available: true,
	},
	{
		id: '3bc6e658-86dc-4985-8559-6fd705e8185a',
		title: 'Ingresso para show',
		description:
			'Aquele show que o casal sempre quis ir, talvez seja você a realizar esse sonho.',
		image: 'https://images.unsplash.com/photo-1522745287160-f12721561e60',
		price: 300.85,
		available: false,
	},
	{
		id: 'ef75c83c-6c92-43da-bc94-4a2a95fd3f62',
		title: 'Geladeira',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5',
		price: 800.0,
		available: true,
	},
	{
		id: '2746e0d8-4083-4ecf-979c-d813e6ff571b',
		title: 'Kit Taças de vinho',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db',
		price: 50.65,
		available: false,
	},
	{
		id: 'b0907530-75b3-4b07-b0d6-9923c34d484c',
		title: 'Jogos de tabuleiro',
		description: 'Casal também joga e nada melhor do que presentear com um jogo de tabuleiro.',
		image: 'https://images.unsplash.com/photo-1640461470346-c8b56497850a',
		price: 248.0,
		available: true,
	},
	{
		id: '',
		title: 'Álbum de Fotos do Casal',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e',
		price: 120.0,
		available: true,
	},
	{
		id: 'cf9f7e51-751b-49be-acf5-6b7b5ea34353',
		title: 'Videogame',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0',
		price: 500.0,
		available: true,
	},
	{
		id: 'abcaf788-ea2b-4326-a74e-f8c131c4a233',
		title: 'Jogo de jantar',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem explicabo fuga a dicta quam tenetur aperiam, soluta asperiores quod vero suscipit iure ad reprehenderit, quas recusandae nisi aliquid repudiandae.',
		image: 'https://images.unsplash.com/photo-1617784625140-515e220ba148',
		price: 220.0,
		available: false,
	},
	{
		id: '825fa197-8a79-4344-91c0-7fa894a9183f',
		title: 'Aulas de culinária',
		description:
			'Uma aula de culinária para o casal pode ser atividades divertidas e educativas para eles desfrutarem juntos.',
		image: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68',
		price: 320.0,
		available: true,
	},
	{
		id: '6297c115-1ea0-4f9a-8cb5-2bbe7dbdc6d8',
		title: 'Um dia de Spa e relaxamento',
		description:
			'Ambiente tranquilo, velas aromáticas, óleos essenciais e o que mais for necessário para o casal relaxar e desfrutar de momentos tranquilos juntos.',
		image: 'https://images.unsplash.com/photo-1620733723572-11c53f73a416',
		price: 120.0,
		available: false,
	},
];
