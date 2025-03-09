import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

type OrderStatus = 'AUTHORIZED' | 'PAID' | 'IN_ANALYSIS' | 'DECLINED' | 'CANCELED';

interface IMakeOrderRequest {
	status: OrderStatus;
}

interface IMakeOrderProductsRequest {
	itemName: string;
	productId: string;
	orderId: string;
}

const productsData: Prisma.ProductCreateInput[] = [
	{
		id: randomUUID(),
		title: 'Jogo de Facas 6 peças inox',
		description:
			'Lâminas de aço inox com maior durabilidade do fio devido ao tratamento térmico. Cabos de polipropileno com maior resistência e durabilidade.',
		image:
			'https://images.unsplash.com/photo-1609467334293-030ac6448fd8?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 154.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de 36 peças Talheres Aço Inox',
		description:
			'Totalmente em aço inox, o faqueiro além de ser resistente e durável, deixa a composição da sua mesa ainda mais especial.',
		image:
			'https://images.unsplash.com/photo-1607637508318-d22cfb4299d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 192.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de copos 4 peças',
		description:
			'Feitos Inteiramente em Vidro. Sirva Chá, Sucos, Smoothies ou Outras Bebidas. Elegante, Bonito e Moderno.',
		image:
			'https://img.freepik.com/fotos-gratis/diferentes-copos-transperentes-para-bebidas_231208-2927.jpg?w=1380&t=st=1706659788~exp=1706660388~hmac=d1cfd058975773c3b9e7380cdb55983256dc8fd6c047cd74f898a6a2bcbd6caf',
		price: 139.9,
		amount: 2,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de Panelas 7 peças',
		description: 'Antiaderente mais resistente, livres de metais pesados e elementos químicos prejudiciais à saúde.',
		image:
			'https://img.freepik.com/fotos-gratis/vista-lateral-de-cozinhar-conjunto-de-tachos-e-panelas-nas-prateleiras-de-madeira-jpg_140725-12791.jpg?size=626&ext=jpg&ga=GA1.1.881018375.1706112835&semt=ais',
		price: 285.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de Panelas 10 peças',
		description: 'Antiaderente mais resistente, livres de metais pesados e elementos químicos prejudiciais à saúde.',
		image: '/jogo-panela-10.png',
		price: 799.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Armário Aéreo',
		description: 'Armário de cozinha suspenso.',
		image: '/armario-aereo.png',
		price: 478.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Aspirador de Pó Vertical',
		description: 'Com um simples toque de um botão, limpa e aspira.',
		image:
			'https://img.freepik.com/vetores-gratis/conjunto-de-aspiradores-realistas-de-varios-tipos_1284-32867.jpg?w=900&t=st=1706660049~exp=1706660649~hmac=97f7ce07972ac963bf47a852b6b96d1921477cec7f9dd808f7e9a60cc5936b38',
		price: 329.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Ferro de Passar A Vapor Speed Steam Black+Decker Antigotejamento Base Antiaderente',
		description:
			'Mantenha suas roupas impecáveis e higienizadas de maneira fácil e rápida com o ferro de passar roupa.',
		image: '/ferro-passar.png',
		price: 239.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo Panelas Aço 5 peças Inox Solar',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1584990347193-6bebebfeaeee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 580.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
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
		id: randomUUID(),
		title: 'Batedeira Planetária',
		description: 'POTÊNCIA DE 400W: De claras em neve até massas de bolo, é garantia de uma consistência perfeita!',
		image:
			'https://images.unsplash.com/photo-1653075184239-c4970c3ad278?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 379.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Cafeteira Cápsulas',
		description:
			'Você pode preparar um cremoso café Espresso, um Chococcino quentinho ou até um chá gelado na sua casa com passos simples e de forma super-rápida.',
		image:
			'https://images.unsplash.com/photo-1608354580875-30bd4168b351?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 474.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Liquidificador Jarra de Vidro',
		description:
			'Com a Jarra Inquebrável, você pode, até colocá-la no freezer, ou líquidos quentes, que ela não racha ou danifica.',
		image:
			'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 349.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Multiprocessador Inox',
		description:
			'Exclusiva tecnologia que combina 2 lâminas com ângulos de corte perfeito, muito mais fino e preciso. Assim é possível preparar diversas receitas.',
		image: '/multiprocessador.jpg',
		price: 319.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Air Fryer',
		description: 'Frita, grelha e assa em temperatura máxima ou mínima.',
		image:
			'https://img.freepik.com/fotos-gratis/feche-deliciosos-croquetes-de-comida-frita_23-2149202622.jpg?w=740&t=st=1706663528~exp=1706664128~hmac=8dbff61fda1d151d0fe097aa5c4611d1f83e62b69ee1f595f58c56d39e3b8845',
		price: 395.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Forno Micro-ondas',
		description: 'Receitas pré-programadas, Trava de Segurança.',
		image:
			'https://img.freepik.com/vetores-gratis/forno-de-microondas-branco-com-placa-de-vidro-vazio-no-interior-com-abrir-e-fechar-a-porta_1441-1620.jpg?w=740&t=st=1706660934~exp=1706661534~hmac=c7fc9130d07cf644004fd0375bea743b6104e3efe96e21a1b9178d717f424111',
		price: 519.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Forno Elétrico Britânia BFE45PI',
		description: 'Receitas pré-programadas, Trava de Segurança.',
		image: '/forno-eletrico.png',
		price: 459.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
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
		id: randomUUID(),
		title: 'Jogo de 2 Toalhas de Banho',
		description: 'Transformam seu banho em um momento de puro conforto e cuidado.',
		image: '/kit-2-toalhas.png',
		price: 189.9,
		amount: 2,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Kit para Churrasco 15 Peças',
		description: 'Transformam seu banho em um momento de puro conforto e cuidado.',
		image:
			'https://images.unsplash.com/photo-1504564321107-4aa3efddb5bd?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 735.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Kit toalha de lavabo 4 peças branco',
		description:
			'Toque suave e macio das nossas toalhas de algodão premium, que transformam seu banho em um momento de puro conforto e cuidado.',
		image:
			'https://img.freepik.com/fotos-gratis/bela-composicao-para-conceito-de-spa-ou-banho_23-2148094138.jpg?w=740&t=st=1706661157~exp=1706661757~hmac=b8c0e5931b30131cf1ed6c7621ef269eb805275530c7e9a40ed27db3ee6da92a',
		price: 200.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de cama queen plus 4 peças',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/jogo-cama-queen-4-pcs.jpg',
		price: 369.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de cama queen 4 peças',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/jogo-cama.jpg',
		price: 499.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: '4 Almofadas quadrada lisa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1553114552-c4ece3a33c93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 287.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Edredom Queen',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/jogo-cama.jpg',
		price: 469.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Kit colcha queen 3 peças',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/jogo-cama.jpg',
		price: 349.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'kit 4 Travesseiros',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/fotos-gratis/travesseiro-no-sofa_1203-2706.jpg?w=1380&t=st=1706661537~exp=1706662137~hmac=7200337a6ce8ce95adfc61c4e47c565e8c02ac24a3de892e66712a008f2d1799',
		price: 359.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Guarda Roupas',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 2500.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Armário de Cozinha',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1596552183299-000ef779e88d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 1299.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Mesa de Cabeceira',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 799.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Armário Aéreo de Canto Reto',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/armario-aereo-canto-reto.png',
		price: 474.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Conjunto Sala de Jantar Mesa Tampo de Vidro 4 Cadeiras',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/mesa-jantar.png',
		price: 1169.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Kit Banheiro com Porta Sabonete Líquido 4 Pçs Branco',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: '/kit_banheiro.png',
		price: 316.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Cortina Duplex',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 399.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Patrocine a despedida do noivo',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1699730185428-d11054059c7f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 350.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Patrocine a despedida do noiva',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1518102885802-e869dcb9da8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 350.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Garrafa de Vinho da lua de mel',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db',
		price: 200.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de taças vinho 4 peças ',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db',
		price: 100.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Passeios da lua de mel',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 400.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jantar romântico',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image: 'https://images.unsplash.com/photo-1529516222410-a269d812f320',
		price: 350.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Hospedagem da lua-de-mel',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://images.unsplash.com/photo-1551016043-06ec2173531b?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		price: 950.0,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de Pratos Rasos (6 Peças)',
		description:
			'Típico estilo de prato que serve bem para todas as refeições. Com um toque de estilo e elegância, é um presente perfeito que merece seu destaque.',
		image:
			'https://img.freepik.com/fotos-gratis/mao-segurando-placas-brancas-na-superficie-cinza-com-superficie-gradiente-de-granulacao-grossa-angustiada_179666-42609.jpg?size=626&ext=jpg&ga=GA1.1.881018375.1706112835&semt=ais',
		price: 159.9,
		amount: 1,
		available: true,
	},
	{
		id: randomUUID(),
		title: 'Jogo de 6 Pratos Fundos',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis delectus ipsam tempore cum, eius ad ut perferendis, eaque magni dolorem, culpa laborum porro beatae tenetur quasi? Nihil, at maiores.',
		image:
			'https://img.freepik.com/vetores-gratis/pratos-brancos-pratos-de-ceramica-3d-realistas-e-colecao-de-vista-lateral_107791-3743.jpg?w=900&t=st=1707617776~exp=1707618376~hmac=62d1e9ebc07a5f783472f0058785e08ccc67fbe208129304ec592f7d7028f419',
		price: 262.0,
		amount: 1,
		available: true,
	},
];

function makeOrders({ status }: IMakeOrderRequest): Prisma.OrderCreateInput {
	const radomCreatedDate = faker.date.between({
		from: '2024-01-01T00:00:00.000Z',
		to: '2024-02-29T00:00:00.000Z',
	});

	return {
		customerName: faker.person.fullName(),
		customerEmail: faker.internet.email({ provider: 'gmail.com' }).toLowerCase(),
		customerCpf: faker.number.int({ min: 99999999999 }).toString(),
		checkoutId: `CHEC_${randomUUID()}`.toUpperCase(),
		referenceId: randomUUID(),
		status,
		created_at: radomCreatedDate,
	};
}

function makeOrderProducts({
	productId,
	itemName,
	orderId,
}: IMakeOrderProductsRequest): Prisma.OrderProductsUncheckedCreateInput {
	return {
		itemReferenceId: randomUUID(),
		itemName,
		itemQuantity: 1,
		productId,
		orderId,
	};
}

const paidOrdersList = Array.from({ length: 5 }).map(() => {
	return makeOrders({ status: 'PAID' });
});

const declinedOrderList = Array.from({ length: 2 }).map(() => {
	return makeOrders({ status: 'DECLINED' });
});

const inAnalysisOrderList = Array.from({ length: 3 }).map(() => {
	return makeOrders({ status: 'IN_ANALYSIS' });
});

const canceledOrderList = Array.from({ length: 1 }).map(() => {
	return makeOrders({ status: 'CANCELED' });
});

const orderListToCreate = [...paidOrdersList, ...declinedOrderList, ...inAnalysisOrderList, ...canceledOrderList];

const guestList: Prisma.GuestCreateManyInput[] = Array.from({ length: 35 }).map(() => {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		phone: `929${faker.string.numeric(8)}`,
		familyMembersAmount: faker.number.int({ min: 0, max: 6 }),
	};
});

async function main() {
	console.log('Delete db registers...');

	await prisma.orderProducts.deleteMany();
	await prisma.order.deleteMany();
	await prisma.product.deleteMany();

	console.log('Start seeding...');

	for (const product of productsData) {
		const productSeed = await prisma.product.create({
			data: product,
		});

		console.log(`Created gift: ${productSeed.title}`);
	}

	// for (const order of orderListToCreate) {
	// 	const randomAmountOfProducts = faker.number.int({ min: 1, max: 2 });

	// 	const orderSeed = await prisma.order.create({
	// 		data: order,
	// 	});

	// 	const orderProductsList = Array.from({ length: randomAmountOfProducts }).map(() => {
	// 		const randomGiftIndex = faker.number.int({ min: 1, max: giftsData.length - 1 });
	// 		const gift = giftsData[randomGiftIndex];

	// 		return makeOrderProducts({
	// 			itemName: gift.title,
	// 			giftId: gift.id!,
	// 			orderId: orderSeed.id,
	// 		});
	// 	});

	// 	const orderProductSeed = await prisma.orderProducts.createMany({
	// 		data: orderProductsList,
	// 	});

	// 	await prisma.product.updateMany({
	// 		data: {
	// 			amount: 0,
	// 			available: false,
	// 		},
	// 		where: {
	// 			id: { in: orderProductsList.map((item) => item.productId) },
	// 		},
	// 	});

	// 	console.log(`Created order: ${orderSeed.id}`);
	// 	console.log(`Created amount order_product: ${orderProductSeed.count}`);
	// }

	// await prisma.guest.createMany({
	// 	data: guestList,
	// });

	console.log('Seeding Finished');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.log('Db seede error: ', error);
		await prisma.$disconnect;
		process.exit(1);
	});
