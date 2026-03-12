export const pokemonDetailsZoomAnimation = {
	forwards: {
		old: {
			name: 'astroFadeOut',
			duration: '120ms',
			easing: 'ease-out',
			fillMode: 'both',
		},
		new: [
			{
				name: 'astroFadeIn',
				duration: '220ms',
				easing: 'ease-out',
				fillMode: 'both',
			},
			{
				name: 'pokemonZoomIn',
				duration: '220ms',
				easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
				fillMode: 'both',
			},
		],
	},
	backwards: {
		old: [
			{
				name: 'astroFadeOut',
				duration: '120ms',
				easing: 'ease-out',
				fillMode: 'both',
			},
			{
				name: 'pokemonZoomOut',
				duration: '220ms',
				easing: 'ease-out',
				fillMode: 'both',
			},
		],
		new: {
			name: 'astroFadeIn',
			duration: '220ms',
			easing: 'ease-out',
			fillMode: 'both',
		},
	},
};
