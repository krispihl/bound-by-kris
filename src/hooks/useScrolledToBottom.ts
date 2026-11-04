import { useEffect, useState } from 'react'

// Allows for scroll positions that land a fraction of a pixel short of the end, as they do on zoomed or high-density
// screens.
const TOLERANCE = 2

const isAtBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - TOLERANCE

// Whether the window is scrolled all the way to the end of the page. Checked again on every scroll and resize, so it
// turns false as soon as the reader scrolls back up.
export const useScrolledToBottom = () => {
	const [atBottom, setAtBottom] = useState(false)

	useEffect(() => {
		const update = () => setAtBottom(isAtBottom())

		update()
		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)

		return () => {
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [])

	return atBottom
}
