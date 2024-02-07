import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const giftsData: Prisma.GiftCreateInput[] = [
	{
		title: 'Jogo de Facas',
		description:
			'Lâminas de aço inox com maior durabilidade do fio devido ao tratamento térmico. Cabos de polipropileno com maior resistência e durabilidade.',
		image:
			'https://images.unsplash.com/photo-1609467334293-030ac6448fd8?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 154.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Jogo de Talheres',
		description:
			'Totalmente em aço inox, o faqueiro além de ser resistente e durável, deixa a composição da sua mesa ainda mais especial.',
		image:
			'https://images.unsplash.com/photo-1607637508318-d22cfb4299d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 192.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Jogo de Copos',
		description:
			'Feitos Inteiramente em Vidro. Sirva Chá, Sucos, Smoothies ou Outras Bebidas. Elegante, Bonito e Moderno.',
		image:
			'https://img.freepik.com/fotos-gratis/diferentes-copos-transperentes-para-bebidas_231208-2927.jpg?w=1380&t=st=1706659788~exp=1706660388~hmac=d1cfd058975773c3b9e7380cdb55983256dc8fd6c047cd74f898a6a2bcbd6caf',
		price: 90.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Jogo de Panelas',
		description:
			'Antiaderente mais resistente, livres de metais pesados e elementos químicos prejudiciais à saúde.',
		image:
			'https://images.unsplash.com/photo-1592156553722-a2335059951a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 488.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Porta Temperos',
		description: 'kit 6 Porta Temperos Inox, frasco de vidro.',
		image:
			'https://img.freepik.com/fotos-gratis/natureza-morta-com-varias-especiarias_23-2149444662.jpg?w=1380&t=st=1706660124~exp=1706660724~hmac=c4224958ce6e9284c2afb7fb589fe7a9be0d29b86c5ebcbbb7f5fde188de2ade',
		price: 90.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Aspirador de Pó',
		description: 'Com um simples toque de um botão, limpa e aspira.',
		image:
			'https://img.freepik.com/vetores-gratis/conjunto-de-aspiradores-realistas-de-varios-tipos_1284-32867.jpg?w=900&t=st=1706660049~exp=1706660649~hmac=97f7ce07972ac963bf47a852b6b96d1921477cec7f9dd808f7e9a60cc5936b38',
		price: 229.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Ferro de Passar Roupas',
		description:
			'Mantenha suas roupas impecáveis e higienizadas de maneira fácil e rápida com o ferro de passar roupa.',
		image:
			'https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 180.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Smart TV',
		description:
			'Presentear o casal com uma boa Smart TV para que possam, juntinhos, apreciar o melhor do K-Drama na Netflix? Com certeza é uma ótima opção (A Noiva, em especial, vai adorar).',
		image:
			'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 1675.02,
		amount: 1,
		available: true,
	},
	{
		title: 'Batedeira',
		description:
			'POTÊNCIA DE 400W: De claras em neve até massas de bolo, é garantia de uma consistência perfeita!',
		image:
			'https://images.unsplash.com/photo-1653075184239-c4970c3ad278?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 260.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Cafeteira',
		description:
			'Você pode preparar um cremoso café Espresso, um Chococcino quentinho ou até um chá gelado na sua casa com passos simples e de forma super-rápida.',
		image:
			'https://images.unsplash.com/photo-1608354580875-30bd4168b351?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 474.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Liquidificador',
		description:
			'Com a Jarra Inquebrável, você pode, até colocá-la no freezer, ou líquidos quentes, que ela não racha ou danifica.',
		image:
			'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 138.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Multiprocessador',
		description:
			'Exclusiva tecnologia que combina 2 lâminas com ângulos de corte perfeito, muito mais fino e preciso. Assim é possível preparar diversas receitas.',
		image: '/multiprocessador.jpg',
		price: 268.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Air Fryer',
		description: 'Frita, grelha e assa em temperatura máxima ou mínima.',
		image:
			'https://img.freepik.com/fotos-gratis/feche-deliciosos-croquetes-de-comida-frita_23-2149202622.jpg?w=740&t=st=1706663528~exp=1706664128~hmac=8dbff61fda1d151d0fe097aa5c4611d1f83e62b69ee1f595f58c56d39e3b8845',
		price: 359.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Forno Micro-ondas',
		description: 'Receitas pré-programadas, Trava de Segurança.',
		image:
			'https://img.freepik.com/vetores-gratis/forno-de-microondas-branco-com-placa-de-vidro-vazio-no-interior-com-abrir-e-fechar-a-porta_1441-1620.jpg?w=740&t=st=1706660934~exp=1706661534~hmac=c7fc9130d07cf644004fd0375bea743b6104e3efe96e21a1b9178d717f424111',
		price: 519.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Lavadoura de Roupas',
		description:
			'Roupas limpinhas e macias é qualidade de vida. Então, nada melhor que contribuir com o casal com sua lavadoura de roupas.',
		image:
			'https://img.freepik.com/fotos-gratis/maquina-de-lavar-em-uma-lavanderia-minimalista_53876-145501.jpg?w=1380&t=st=1706664022~exp=1706664622~hmac=ce26c671112b0c341182f8010d36184c0543b3f406aa9a4d271ce517dbbfed7c',
		price: 599.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Jogo de Toalhas de Banho',
		description: 'Transformam seu banho em um momento de puro conforto e cuidado.',
		image:
			'https://images.unsplash.com/photo-1617811449482-31093c8cee16?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 189.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Jogo de Toalhas de rosto',
		description:
			'Toque suave e macio das nossas toalhas de algodão premium, que transformam seu banho em um momento de puro conforto e cuidado.',
		image:
			'https://img.freepik.com/fotos-gratis/bela-composicao-para-conceito-de-spa-ou-banho_23-2148094138.jpg?w=740&t=st=1706661157~exp=1706661757~hmac=b8c0e5931b30131cf1ed6c7621ef269eb805275530c7e9a40ed27db3ee6da92a',
		price: 67.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Lençois de cama',
		description:
			'Promovem um toque suave e aconchegante com uma sensação de dormir em um hotel 5 estrelas.',
		image:
			'https://img.freepik.com/fotos-gratis/arranjo-de-cama-aconchegante-de-alto-angulo_23-2150326152.jpg?w=740&t=st=1706661281~exp=1706661881~hmac=4933004c1f24b5d21899383ac9718771904ef2044111d6713a7e79352ab10c6e',
		price: 109.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Jogo de Cama',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/jogo-cama.jpg',
		price: 189.0,
		amount: 2,
		available: true,
	},
	{
		title: 'Edredom',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/cama-de-edredom-dobravel_53876-133357.jpg?w=1380&t=st=1706661446~exp=1706662046~hmac=83e3951629aeb84a0302561f402e3d55542d4715a945d6f8f2de9cce301e51c9',
		price: 169.0,
		amount: 2,
		available: true,
	},
	{
		title: 'Colchas',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/close-up-da-manta-cinzenta-na-cama_1122-1470.jpg?1&w=1380&t=st=1706661495~exp=1706662095~hmac=ba937c1116a134b7146023189eb4abd935a2e42f2820a1ee2e342ffb146f1a10',
		price: 147.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Travesseiros',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/travesseiro-no-sofa_1203-2706.jpg?w=1380&t=st=1706661537~exp=1706662137~hmac=7200337a6ce8ce95adfc61c4e47c565e8c02ac24a3de892e66712a008f2d1799',
		price: 154.99,
		amount: 2,
		available: true,
	},
	{
		title: 'Cortinas',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 159.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Almofadas',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/close-up-do-sofa-com-tres-almofadas_1203-527.jpg?w=740&t=st=1706661655~exp=1706662255~hmac=0088b3df7159deb623b6f3ea1749d1a4dcf2ed99da4752e7383854fef81ffb21',
		price: 129.9,
		amount: 1,
		available: true,
	},
	{
		title: 'Tapetes',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/luminaria-de-chao-e-um-sofa_1203-443.jpg?w=740&t=st=1706661716~exp=1706662316~hmac=d5ee3e544e97ea56fd83cf981fe175727a6170c441bf439e809b340133fd4f72',
		price: 197.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Guarda Roupas',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 799.99,
		amount: 1,
		available: true,
	},
	{
		title: 'Sofá',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 989.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Armário de Cozinha',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/renderizacao-de-cozinha-contemporanea-3d_1048-17291.jpg?w=740&t=st=1706661914~exp=1706662514~hmac=cb97fe56bd970e57fa51d9aff941d31292293c97d283b44be532e75b54fecbd1',
		price: 1299.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Conjunto mesa e cadeiras',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=2004&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 1469.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Patrocine a despedida do noivo',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/homens-felizes-na-despedida-de-solteiro_23-2149275500.jpg?w=1380&t=st=1706662036~exp=1706662636~hmac=fb547658141592250feac1b9119c0c5ec61d662dc9e622ac5f5467eb9925b175',
		price: 350.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Patrocine a despedida do noiva',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/mulheres-fazendo-os-preparativos-para-o-casamento_23-2149184345.jpg?w=1380&t=st=1706662068~exp=1706662668~hmac=a88ab23d5ff7e1378ff5c9e758304628b966b91d1758ffd852ba66e49badbdc6',
		price: 350.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Garrafa de Vinho da lua de mel',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db',
		price: 200.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Passeios da lua de mel',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/casal-apaixonado-senta-se-no-cais-e-olha-para-o-mar_8353-11389.jpg?w=1380&t=st=1706662206~exp=1706662806~hmac=1cbe8a934763c73833703b93701fa89cce0803b9e517446cd15d19b868e8122c',
		price: 400.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Jantar romântico',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: 'https://images.unsplash.com/photo-1529516222410-a269d812f320',
		price: 350.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Hospedagem da lua-de-mel',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/recepcionistas-em-ternos-elegantes-durante-o-horario-de-trabalho_23-2149714414.jpg?w=1380&t=st=1706663846~exp=1706664446~hmac=8b5fff59794a29653baa737a0c0a1757bf7566e0dec6aec7a8d5c89209363b11',
		price: 950.0,
		amount: 1,
		available: true,
	},
	{
		title: 'Só pra não dizer que não dei nada',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: 'https://images.unsplash.com/photo-1526614180703-827d23e7c8f2',
		price: 50.0,
		amount: 2,
		available: true,
	},
];

async function main() {
	console.log('Start seeding...');

	for (const gift of giftsData) {
		const giftSeed = await prisma.gift.create({
			data: gift,
		});

		console.log(`Created gift: ${giftSeed.title}`);
	}

	console.log('Seeding Finished');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.log('Gifts Seeds Error: ', error);
		await prisma.$disconnect;
		process.exit(1);
	});
