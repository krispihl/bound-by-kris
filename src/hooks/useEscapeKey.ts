import { useEffect, useRef } from 'react'

export const useEscapeKey = (isActive: boolean, onEscape: () => void) => {
	// The latest handler, so a new function on every render doesn't make the listener come off and go back on.
	const onEscapeRef = useRef(onEscape)
	useEffect(() => {
		onEscapeRef.current = onEscape
	})

	useEffect(() => {
		if (!isActive) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onEscapeRef.current()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isActive])
}
