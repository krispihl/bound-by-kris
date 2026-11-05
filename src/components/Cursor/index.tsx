import { useEffect, useRef, useState } from 'react'

import styles from './index.module.css'

// Only for a mouse or trackpad, and left out entirely for anyone who asks for less motion.
const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
// How much of the way to the pointer the glow covers each frame, so it trails slightly behind.
const FOLLOW = 0.2
// How much the glow stretches along its path for each pixel it moves in a frame, up to a limit.
const STRETCH = 0.04
const MAX_STRETCH = 1
const MAX_SQUASH = 0.3
// Anything that can be clicked or typed into. The glow fades out over these, so it never gets in the way of reading
// what they say.
const INTERACTIVE = 'a, button, input, select, textarea, label, summary, [role="button"]'

// Used on the homepage only. A small fuchsia glow that trails the pointer and stretches the faster it moves. The real cursor stays as it is; this
// only follows it. Drawn straight to the style on each frame, so moving the pointer doesn't re-render anything, and the
// frames stop once the glow has caught up.
export const Cursor = () => {
	const ref = useRef<HTMLDivElement>(null)
	const [enabled] = useState(() => window.matchMedia(QUERY).matches)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const target = { x: 0, y: 0 }
		const position = { x: 0, y: 0 }
		let frame = 0
		let visible = false

		const draw = () => {
			const dx = (target.x - position.x) * FOLLOW
			const dy = (target.y - position.y) * FOLLOW
			position.x += dx
			position.y += dy

			const speed = Math.hypot(dx, dy) * STRETCH
			const angle = Math.atan2(dy, dx)
			element.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}rad) scale(${1 + Math.min(speed, MAX_STRETCH)}, ${1 - Math.min(speed, MAX_SQUASH)})`

			frame = Math.hypot(target.x - position.x, target.y - position.y) > 0.1 ? requestAnimationFrame(draw) : 0
		}

		const move = (event: PointerEvent) => {
			if (event.pointerType === 'touch') return

			target.x = event.clientX
			target.y = event.clientY
			// Starts at the pointer when it (re)enters the window, rather than flying in from where it was last seen.
			if (!visible) {
				position.x = target.x
				position.y = target.y
				visible = true
				element.classList.add(styles['cursor--visible'])
			}
			const overInteractive = event.target instanceof Element && event.target.closest(INTERACTIVE) !== null
			element.classList.toggle(styles['cursor--faded'], overInteractive)
			if (!frame) frame = requestAnimationFrame(draw)
		}

		const leave = () => {
			visible = false
			element.classList.remove(styles['cursor--visible'])
		}

		window.addEventListener('pointermove', move, { passive: true })
		document.documentElement.addEventListener('pointerleave', leave)

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('pointermove', move)
			document.documentElement.removeEventListener('pointerleave', leave)
		}
	}, [enabled])

	if (!enabled) return null

	return <div ref={ref} className={styles.cursor} aria-hidden="true" />
}
