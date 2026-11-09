import { MEDIA_QUERIES } from './src/styles/breakpoints.ts'

// Each breakpoint becomes a mixin that wraps what's inside it in its media query, e.g. `@mixin not-mobile { ... }`.
const breakpointMixins = Object.fromEntries(
	Object.entries(MEDIA_QUERIES).map(([name, query]) => [name, { [`@media ${query}`]: { '@mixin-content': {} } }])
)

// For a link with padding around its text: draws the focus ring round the text instead of round the padding, which
// would bring it close to what is above and below. The link needs `position: relative`. `inset` is how far the ring's
// box sits in from the link's edges (the padding, to get to the text), `offset` the gap between that box and the ring,
// e.g. `@mixin text-focus-ring 0.75rem 0, 0.25rem;`.
const textFocusRing = (_mixin, inset, offset) => ({
	'&:focus-visible': { outline: 'none' },
	'&:focus-visible::before': {
		content: "''",
		position: 'absolute',
		inset,
		outline: 'var(--focus-width) solid var(--color-focus)',
		'outline-offset': offset,
	},
})

export default {
	plugins: {
		'postcss-mixins': { mixins: { ...breakpointMixins, 'text-focus-ring': textFocusRing } },
		'postcss-nested': {},
		'postcss-preset-env': {
			stage: 3,
			features: {
				'nesting-rules': false,
			},
		},
		autoprefixer: {},
	},
}
