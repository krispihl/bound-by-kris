import { useEffect, useRef, useSyncExternalStore } from 'react'

import styles from './index.module.css'

// Only for a mouse or trackpad, and left out entirely for anyone who asks for less motion.
const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
// How much of the way to the pointer the glow covers each frame, so it trails slightly behind.
const FOLLOW = 0.2
// How much the glow stretches along its path for each pixel it moves in a frame, up to a limit.
const STRETCH = 0.04
const MAX_STRETCH = 1
const MAX_SQUASH = 0.3
// Anything that can be clicked, typed into or focused. The glow fades out over these, so it never gets in the way of
// reading what they say. A tabindex of -1 is left out, as that only lets a script move focus there.
const INTERACTIVE = [
	'a',
	'button',
	'input',
	'select',
	'textarea',
	'label',
	'summary',
	'[role="button"]',
	'[role="link"]',
	'[role="tab"]',
	'[role="menuitem"]',
	'[contenteditable]:not([contenteditable="false"])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ')
// The fixed header bar (marked in the Navbar), whose own background would cover the glow, and its menu, which should
// keep covering it.
const HEADER = '[data-site-header]'
const MENU = 'nav'

const subscribe = (onChange: () => void) => {
	const list = window.matchMedia(QUERY)
	list.addEventListener('change', onChange)

	return () => list.removeEventListener('change', onChange)
}
const getEnabled = () => window.matchMedia(QUERY).matches

// Over the header bar while its menu is hidden. Once the menu shows (until it has finished closing), it covers the bar,
// so the glow stays under it there too, even over the Close button, which isn't inside the menu.
const isOverHeaderBar = (target: EventTarget | null) => {
	const header = target instanceof Element ? target.closest(HEADER) : null
	const menu = header?.querySelector(MENU)
	return header !== null && (!menu || getComputedStyle(menu).visibility === 'hidden')
}

// Used on the homepage only. A small fuchsia glow that trails the pointer and stretches the faster it moves. The real
// cursor stays as it is; this only follows it. Drawn straight to the style on each frame, so moving the pointer doesn't
// re-render anything, and the frames stop once the glow has caught up. Follows the media query, so it comes and goes
// when a mouse is plugged in or the motion setting changes.
export const Cursor = () => {
	const ref = useRef<HTMLDivElement>(null)
	const enabled = useSyncExternalStore(subscribe, getEnabled)

	useEffect(() => {
		const element = ref.current
		if (!element) {
			return
		}

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
			if (event.pointerType === 'touch') {
				return
			}

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
			element.classList.toggle(styles['cursor--raised'], isOverHeaderBar(event.target))
			if (!frame) {
				frame = requestAnimationFrame(draw)
			}
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

	if (!enabled) {
		return null
	}

	return <div ref={ref} className={styles.cursor} aria-hidden="true" />
}
