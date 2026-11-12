import cx from 'classnames'
import type { TransitionEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { A11yText } from '../../components/A11yText'
import { BiteContent } from '../../components/BiteContent'
import { ExternalLink } from '../../components/ExternalLink'
import { Krispi } from '../../components/Krispi'
import { PageHeading } from '../../components/PageHeading'
import { RichText } from '../../components/RichText'
import { A11Y_BITES } from '../../data/a11yBites'
import { A11Y_RESOURCES } from '../../data/a11yResources'
import { usePageTitle } from '../../hooks/usePageTitle'
import { getBiteSections } from '../../utils/biteSections'

import styles from './index.module.css'

// Krispi is switched off on this page for now. Set to true to bring it back.
const SHOW_KRISPI = false

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const scrollRowIntoView = (row: Element) => {
	row.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

// A long bite collapses from under the pointer, so bring a closed row back if it ends up above the viewport.
const showRowIfAbove = (row: Element | null) => {
	requestAnimationFrame(() => {
		if (row && row.getBoundingClientRect().top < 0) {
			scrollRowIntoView(row)
		}
	})
}

export const A11yBites = () => {
	usePageTitle('Accessibility bites')

	const [openNumber, setOpenNumber] = useState<number | null>(null)
	// The bite whose panel is still collapsing. It no longer counts as open, but stays on the page until it has collapsed.
	const [closingNumber, setClosingNumber] = useState<number | null>(null)
	const pageRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLUListElement>(null)
	// The row to bring back into view once the closing bite has collapsed.
	const rowToShowRef = useRef<Element | null>(null)

	const openBite = (number: number) => {
		setClosingNumber(null)
		rowToShowRef.current = null
		setOpenNumber(number)
	}

	// With reduced motion the panel has no collapse to wait for, so it is gone at once.
	const closeBite = (number: number, row: Element | null = null) => {
		setOpenNumber(null)
		if (prefersReducedMotion()) {
			showRowIfAbove(row)
			return
		}
		rowToShowRef.current = row
		setClosingNumber(number)
	}

	const removeClosedPanel = (event: TransitionEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) {
			return
		}
		setClosingNumber(null)
		showRowIfAbove(rowToShowRef.current)
		rowToShowRef.current = null
	}

	// Closes a bite from inside its content. Its title is the control that closes it, and the one the reader was last at,
	// so focus goes back there before the content is removed, rather than being lost with it.
	const closeFromContent = (number: number, row: Element | null) => {
		document.getElementById(`bite-${number}-button`)?.focus()
		closeBite(number, row)
	}

	// Opening a bite can leave it above the viewport (e.g. after closing a long one higher up), so bring its whole row back,
	// including the space above the title.
	useEffect(() => {
		const row = listRef.current?.querySelector('[aria-expanded="true"]')?.closest('li')
		if (!row) {
			return
		}

		const title = row.querySelector('h2')?.getBoundingClientRect()
		if (row.getBoundingClientRect().top < 0 || (title && title.bottom > window.innerHeight)) {
			scrollRowIntoView(row)
		}
	}, [openNumber])

	// Escape closes the open bite, as it does the menu. Focus is on its title or in its content, or on the page itself after
	// a click on its text, so the key is taken from anywhere on the page, but not from the header, e.g. an open menu.
	useEffect(() => {
		if (openNumber === null) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const isOnPage = event.target === document.body || (event.target instanceof Node && pageRef.current?.contains(event.target))
			if (event.key === 'Escape' && isOnPage) {
				closeFromContent(openNumber, document.getElementById(`bite-${openNumber}-button`)?.closest('li') ?? null)
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	})

	return (
		<>
			<div ref={pageRef} className={styles.page}>
				<div className={styles.page__header}>
					<PageHeading className={styles.page__title}>
						<A11yText /> bites
					</PageHeading>
					<p className={styles.page__intro}>
						Bite-sized accessibility lessons initially made for my team at work.
						<br />
						Each bite covers one topic, which was relevant at that point in time.
					</p>
				</div>

				<ul ref={listRef} className={styles.list}>
					{A11Y_BITES.map((bite) => {
						const isOpen = openNumber === bite.number
						const isClosing = closingNumber === bite.number
						// Open, or closed but still collapsing.
						const isShown = isOpen || isClosing
						const buttonId = `bite-${bite.number}-button`
						const panelId = `bite-${bite.number}-panel`
						const summaryId = `bite-${bite.number}-summary`
						const sections = isShown ? getBiteSections(bite) : []
						const headings = sections.map((section) => section.heading)

						return (
							<li key={bite.number} className={cx(styles.row, isShown && styles['row--open'], isClosing && styles['row--closing'])}>
								<h2 className={styles.row__heading}>
									<button
										id={buttonId}
										className={styles.row__button}
										aria-expanded={isOpen}
										aria-controls={panelId}
										aria-describedby={summaryId}
										onClick={() => (isOpen ? closeBite(bite.number) : openBite(bite.number))}
									>
										{bite.title}
									</button>
								</h2>
								<span className={styles.row__number} aria-hidden="true">
									{String(bite.number).padStart(2, '0')}
								</span>
								<p id={summaryId} className={styles.row__summary}>
									<RichText text={bite.summary} />
								</p>
								<span className={styles.row__icon} aria-hidden="true" />
								{headings.length > 0 ? (
									<nav className={styles.row__contents} aria-label={`${bite.title} contents`}>
										<ol className={styles.contents}>
											{headings.map((heading) => (
												<li key={heading.id}>
													<a className={styles.contents__link} href={`#${heading.id}`}>
														<span className={styles.contents__number} aria-hidden="true">
															{heading.label}
														</span>
														<RichText text={heading.text} />
													</a>
												</li>
											))}
										</ol>
									</nav>
								) : null}
								<div
									id={panelId}
									role="region"
									aria-labelledby={buttonId}
									className={cx(styles.row__panel, isClosing && styles['row__panel--closing'])}
									hidden={!isShown}
									onTransitionEnd={removeClosedPanel}
								>
									<div className={styles['row__panel-content']}>
										{isShown ? (
											<>
												<BiteContent sections={sections} />
												<button
													className={styles.row__close}
													onClick={(event) => closeFromContent(bite.number, event.currentTarget.closest('li'))}
												>
													Close <span className="screenreader-only">{bite.title}</span>
												</button>
											</>
										) : null}
									</div>
								</div>
							</li>
						)
					})}
				</ul>

				<section className={styles.resources} aria-labelledby="resources-heading">
					<div className={styles.resources__header}>
						<h2 id="resources-heading" className={styles.resources__title}>
							Resources
						</h2>
						<p className={styles.resources__intro}>Some blogs and docs I turn to when learning and building.</p>
					</div>
					<div className={styles.resources__groups}>
						{A11Y_RESOURCES.map((group, index) => (
							<div key={group.title} className={styles.group}>
								<h3 id={`resources-group-${index}`} className={styles.group__title}>
									{group.title}
								</h3>
								<ul className={styles.group__list} aria-labelledby={`resources-group-${index}`}>
									{group.resources.map((resource) => (
										<li key={resource.href} className={styles.resource}>
											<ExternalLink className={styles.resource__link} href={resource.href}>
												{resource.name}
											</ExternalLink>
											<p className={styles.resource__description}>{resource.description}</p>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>
			</div>
			{/* Outside the page, whose container query would otherwise pin this fixed element to the page instead of the window. */}
			{SHOW_KRISPI ? <Krispi pose="peek" className={styles.peek} /> : null}
		</>
	)
}
