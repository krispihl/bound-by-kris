import { useEffect } from 'react'

// Stops the page scrolling, as behind the open menu. The space kept for the scrollbar (`scrollbar-gutter` in global.css)
// is given up as well, so an overlay over the whole window covers that strip too instead of leaving a line of page
// colour beside it, and the body is padded by the same width so the page doesn't move. Fixed elements on the right read
// the width from `--scrollbar-width` to stay put too.
export const useScrollLock = (isLocked: boolean) => {
	useEffect(() => {
		if (!isLocked) {
			return
		}

		const root = document.documentElement
		const { body } = document
		const scrollbarWidth = window.innerWidth - root.clientWidth
		const previous = {
			overflow: body.style.overflow,
			paddingRight: body.style.paddingRight,
			scrollbarGutter: root.style.scrollbarGutter,
		}

		root.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
		root.style.scrollbarGutter = 'auto'
		body.style.overflow = 'hidden'
		body.style.paddingRight = `${scrollbarWidth}px`

		return () => {
			root.style.removeProperty('--scrollbar-width')
			root.style.scrollbarGutter = previous.scrollbarGutter
			body.style.overflow = previous.overflow
			body.style.paddingRight = previous.paddingRight
		}
	}, [isLocked])
}
