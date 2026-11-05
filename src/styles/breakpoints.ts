// The window widths, in rem, where the layout changes: below `tablet` is mobile, from `desktop` up is desktop. The CSS
// mixins (built in postcss.config.js) and useBreakpoint in code both read them from here, so the two always agree.
// The same as Puco's: tablet from 713px and desktop from 1104px.
export const BREAKPOINTS = {
	tablet: 44.5625,
	desktop: 69,
} as const

// One media query per CSS mixin, used as `@mixin mobile-only { ... }`. Range syntax leaves no gap between neighbours at
// fractional widths, as `max-width: 767px` next to `min-width: 768px` would.
export const MEDIA_QUERIES = {
	'mobile-only': `(width < ${BREAKPOINTS.tablet}rem)`,
	'not-mobile': `(width >= ${BREAKPOINTS.tablet}rem)`,
	'tablet-only': `(${BREAKPOINTS.tablet}rem <= width < ${BREAKPOINTS.desktop}rem)`,
	'mobile-and-tablet': `(width < ${BREAKPOINTS.desktop}rem)`,
	'desktop-only': `(width >= ${BREAKPOINTS.desktop}rem)`,
} as const
