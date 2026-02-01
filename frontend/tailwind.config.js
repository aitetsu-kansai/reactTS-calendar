import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				mono: ['var(--font-mono)'],
			},
			colors: {
				// 'component-bg': '#111113',
				'component-bg': '#0c0c0cff',
				'accent-color': "#ecedee",
				'custom-secondary': 'red',
				content1: '#111111ff',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
}

module.exports = config
