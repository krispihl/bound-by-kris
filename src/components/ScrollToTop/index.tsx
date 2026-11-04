import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the previous page's scroll position, so every new page starts back at the top. Only the
// path counts: in-page links (e.g. to #sections) keep their own scrolling. Runs before paint, so the old position never shows.
export const ScrollToTop = () => {
	const { pathname } = useLocation()

	useLayoutEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}
