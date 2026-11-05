import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import styles from './index.module.css'

// The place in the header bar where the heading's small copy is drawn (Navbar renders it).
export const HEADER_HEADING_ID = 'header-heading'

// How big the heading ends up in the header bar, in rem.
const SETTLED_SIZE = 1.5

// The page's <h1>, which moves up into the header bar as the page scrolls, so the reader always sees which page they
// are on. A copy of it, drawn in the header so that it shows over the bar (and under the open menu), starts exactly
// over the heading, rises with the page and shrinks into the bar's left side, where it stays. The heading itself stays
// in the page, unseen, for screen readers; the copy is hidden from them. The scroll animation lives in the CSS; this
// only measures where the heading starts and where it ends up, which the CSS can't work out itself.
export const PageHeading = ({ className, children }: { className: string; children: ReactNode }) => {
	const headingRef = useRef<HTMLHeadingElement | null>(null)
	const textRef = useRef<HTMLSpanElement>(null)
	const copyRef = useRef<HTMLSpanElement>(null)
	const [slot, setSlot] = useState<HTMLElement | null>(null)

	// The header bar renders before the page, so once the heading is in the document, the bar's slot is too.
	const findSlot = useCallback((heading: HTMLHeadingElement | null) => {
		headingRef.current = heading
		if (heading) {
			setSlot(document.getElementById(HEADER_HEADING_ID))
		}
	}, [])

	useEffect(() => {
		const heading = headingRef.current
		const text = textRef.current
		const copy = copyRef.current
		const header = slot?.closest('header')
		if (!heading || !text || !copy || !slot || !header) {
			return
		}

		const measure = () => {
			const start = text.getBoundingClientRect()
			const target = slot.getBoundingClientRect()
			const size = parseFloat(getComputedStyle(text).fontSize)
			const scale = (SETTLED_SIZE * parseFloat(getComputedStyle(document.documentElement).fontSize)) / size
			// Where the text starts on the page, from the top of the page rather than of the window.
			const top = start.top + window.scrollY
			const headerBottom = header.getBoundingClientRect().bottom
			const values = {
				'--heading-size': `${size}px`,
				'--heading-scale': `${scale}`,
				'--heading-from-x': `${start.left - target.left}px`,
				'--heading-from-y': `${top - target.top}px`,
				// Centred on the slot, which sits halfway down the bar.
				'--heading-to-y': `${(-start.height * scale) / 2}px`,
				// The copy keeps pace with the page, so it gets there after scrolling as far as it moves up.
				'--heading-end': `${Math.max(0, top - target.top + (start.height * scale) / 2)}px`,
				// From when the heading starts going under the bar until it is all under it.
				'--heading-under': `${Math.max(0, top - headerBottom)}px`,
				'--heading-gone': `${Math.max(0, top + start.height - headerBottom)}px`,
			}

			for (const element of [heading, copy]) {
				Object.entries(values).forEach(([name, value]) => element.style.setProperty(name, value))
				element.setAttribute('data-measured', '')
			}
		}

		measure()
		window.addEventListener('resize', measure)
		// The web font has a different width from the fallback, so the measurements are taken again once it has loaded.
		document.fonts?.ready.then(measure)

		return () => {
			window.removeEventListener('resize', measure)
		}
	}, [slot])

	return (
		<>
			<h1 ref={findSlot} className={`${styles.heading} ${className}`}>
				<span ref={textRef} className={styles.heading__text}>
					{children}
				</span>
			</h1>
			{slot
				? createPortal(
						<span ref={copyRef} className={styles.copy} aria-hidden="true">
							{children}
						</span>,
						slot
					)
				: null}
		</>
	)
}
