import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the previous page's scroll position, so every new page starts back at the top. Only the
// path counts: in-page links (e.g. to #sections) keep their own scrolling. Runs before paint, so the old position never shows.
//
// Focus would also stay where it was, on a link that may no longer exist, and a screen reader would say nothing about
// the new page, so it moves to the new page's <h1>, like a fresh page load starting at the top. Not on the first load,
// which the browser already starts at the top. After paint, so it runs once the open menu has closed and the page
// behind it is no longer inert.
export const ScrollToTop = () => {
	const { pathname } = useLocation()
	// The path focus was last moved for, so the first load (whose effect StrictMode runs twice) moves nothing.
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
