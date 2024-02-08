import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			screens: {
				hiddenOnPhone: { max: '1024px' },
			},

			gridTemplateColumns: {
				giftResumeTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
				giftListTemplateColumns: 'repeat(auto-fit, minmax(208px, 1fr))',
				form: 'minmax(7.5rem, 17.5rem) minmax(25rem, 1fr) minmax(0, 15rem)',
			},
			gridTemplateRows: {
				giftResumeTemplateRows: 'repeat(2, 100px)',
				giftListTemplateRows: 'repeat(auto-fit, minmax(208px, 1fr))',
			},
			keyframes: {
				overlayShow: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				contentShow: {
					from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
					to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
				},
			},
			animation: {
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
			},

			colors: {
				marsala: '#672c31',
			},
		},
	},
	plugins: [],
};
export default config;
