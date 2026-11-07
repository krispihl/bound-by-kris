import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the previous page's scroll position, so a new page would open part-way down. This scrolls
// to the top whenever the path changes, so every page starts at the top. Also moves focus to the new page's heading.
export const ScrollToTop = () => {
	const { pathname } = useLocation()
	// The path focus was last moved for. It starts as the first page's path, so the first load moves nothing.
	const focusedPath = useRef(pathname)

	useLayoutEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	useEffect(() => {
		if (focusedPath.current === pathname) {
			return
		}
		focusedPath.current = pathname

		const heading = document.querySelector<HTMLElement>('main h1')
		if (heading) {
			heading.tabIndex = -1
			heading.focus({ preventScroll: true })
		}
	}, [pathname])

	return null
}
