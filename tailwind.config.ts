import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			gridTemplateColumns: {
				giftResumeTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
				form: 'minmax(7.5rem, 17.5rem) minmax(25rem, 1fr) minmax(0, 15rem)',
			},
			gridTemplateRows: {
				giftResumeTemplateRows: 'repeat(2, 100px)',
			},
			colors: {
				main: {
					50: '#fefcfb',
					100: '#fdf7f5',
					200: '#fcf2ee',
					300: '#fbece7',
					400: '#fae8e2',
					500: '#f9e4dd',
					600: '#f8e1d9',
					700: '#f7ddd4',
					800: '#f6d9cf',
					900: '#f5d1c7',
				},
				secondary: {
					50: '#f9f3f1',
					100: '#efe1dc',
					200: '#e4cdc5',
					300: '#d9b8ae',
					400: '#d1a99c',
					500: '#c99a8b',
					600: '#c39283',
					700: '#bc8878',
					800: '#b57e6e',
					900: '#a96c5b',
				},
			},
		},
	},
	plugins: [],
};
export default config;
