import { useEffect, useState } from 'react'

// How many pixels short of the end still count as the end. On a zoomed or high-density screen the scroll position can
// be a fraction of a pixel, while the page height is a whole number, so the very bottom can come out just short of it.
const TOLERANCE = 2

const isAtBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - TOLERANCE

// Whether the window is scrolled all the way to the end of the page. Checked again on every scroll and resize, so it
// turns false as soon as the reader scrolls back up.
export const useScrolledToBottom = () => {
	const [atBottom, setAtBottom] = useState(false)

	useEffect(() => {
		const update = () => setAtBottom(isAtBottom())

		update()
		// Passive is a promise to the browser that this handler only reads the scroll position and never stops the scroll.
		// The browser can then keep scrolling smoothly instead of waiting for the handler to finish first.
		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)

		return () => {
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [])

	return atBottom
}
