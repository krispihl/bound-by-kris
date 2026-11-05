import { MEDIA_QUERIES } from './src/styles/breakpoints.ts'

// Each breakpoint becomes a mixin that wraps what's inside it in its media query, e.g. `@mixin not-mobile { ... }`.
const breakpointMixins = Object.fromEntries(
	Object.entries(MEDIA_QUERIES).map(([name, query]) => [name, { [`@media ${query}`]: { '@mixin-content': {} } }])
)

export default {
	plugins: {
		'postcss-mixins': { mixins: breakpointMixins },
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
