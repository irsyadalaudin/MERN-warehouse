/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			spacing: {
				'176': '176px',
				'250': '250px',
				'363': '363px',
				'900': '900px',
			},
		}
	},
	plugins: [],
}

