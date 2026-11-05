import { useSyncExternalStore } from 'react'

import { MEDIA_QUERIES } from '../styles/breakpoints'

type Device = 'mobile' | 'tablet' | 'desktop'

const getDevice = (): Device => {
	if (window.matchMedia(MEDIA_QUERIES['mobile-only']).matches) return 'mobile'
	if (window.matchMedia(MEDIA_QUERIES['tablet-only']).matches) return 'tablet'
	return 'desktop'
}

// The device only changes when the window crosses one of the two breakpoints, so those are the only queries to watch.
const subscribe = (onChange: () => void) => {
	const lists = [MEDIA_QUERIES['mobile-only'], MEDIA_QUERIES['desktop-only']].map((query) => window.matchMedia(query))
	lists.forEach((list) => list.addEventListener('change', onChange))

	return () => lists.forEach((list) => list.removeEventListener('change', onChange))
}

// Which layout the window is in, by the same breakpoints as the CSS mixins. Uses the media queries themselves rather
// than the window's width, so code and CSS switch at exactly the same point, and re-renders only when that changes.
export const useBreakpoint = () => {
	const device = useSyncExternalStore(subscribe, getDevice)

	return {
		device,
		isMobile: device === 'mobile',
		isTablet: device === 'tablet',
		isDesktop: device === 'desktop',
		isMobileOrTablet: device !== 'desktop',
	}
}
