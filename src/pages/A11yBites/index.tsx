import type { MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { BiteContent } from '../../components/BiteContent'
import { ExternalLink } from '../../components/ExternalLink'
import { Krispi } from '../../components/Krispi'
import { RichText } from '../../components/RichText'
import { A11Y_BITES } from '../../data/a11yBites'
import { A11Y_RESOURCES } from '../../data/a11yResources'
import { usePageTitle } from '../../hooks/usePageTitle'
import { getBiteSections } from '../../utils/biteSections'

import styles from './index.module.css'

export const A11yBites = () => {
	usePageTitle('a11y bites')

	const [openNumber, setOpenNumber] = useState<number | null>(null)
	const listRef = useRef<HTMLUListElement>(null)

	// Lets a click on the opened content close its bite, unless the reader is selecting text or using a link, a code block
	// or a table inside it. A long bite collapses from under the pointer, so bring the closed row back if it ends up above.
	const closeOnContentClick = (event: MouseEvent<HTMLDivElement>) => {
		if (window.getSelection()?.toString() || (event.target instanceof Element && event.target.closest('a, button, [tabindex]'))) {
			return
		}
		const row = event.currentTarget.closest('li')
		setOpenNumber(null)
		requestAnimationFrame(() => {
			if (row && row.getBoundingClientRect().top < 0) {
				const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
				row.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' })
			}
		})
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
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			row.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' })
		}
	}, [openNumber])

	return (
		<>
			<div className={styles.page}>
				<header className={styles.page__header}>
					<h1 className={styles.page__title}>a11y bites</h1>
					<p className={styles.page__intro}>
						Bite-sized accessibility lessons I initially made for my team.
						<br />
						Each bite covers one topic, which was relevant at that point in time.
						<br />
						Click one to read it.
					</p>
				</header>

				<ul ref={listRef} className={styles.list}>
					{A11Y_BITES.map((bite) => {
						const isOpen = openNumber === bite.number
						const buttonId = `bite-${bite.number}-button`
						const panelId = `bite-${bite.number}-panel`
						const summaryId = `bite-${bite.number}-summary`
						const sections = isOpen ? getBiteSections(bite.content, bite.number) : []
						const headings = sections.flatMap((section) => (section.heading ? [section.heading] : []))

						return (
							<li key={bite.number} className={`${styles.row}${isOpen ? ` ${styles['row--open']}` : ''}`}>
								<h2 className={styles.row__heading}>
									<button
										type="button"
										id={buttonId}
										className={styles.row__button}
										aria-expanded={isOpen}
										aria-controls={panelId}
										aria-describedby={summaryId}
										onClick={() => setOpenNumber(isOpen ? null : bite.number)}
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
								{/* Mouse-only shortcut: keyboard and assistive tech close the bite with its title button, which stays the real control. */}
								{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
								<div
									id={panelId}
									role="region"
									aria-labelledby={buttonId}
									className={styles.row__panel}
									hidden={!isOpen}
									onClick={closeOnContentClick}
								>
									{isOpen ? <BiteContent sections={sections} /> : null}
								</div>
							</li>
						)
					})}
				</ul>

				<section className={styles.resources} aria-labelledby="resources-heading">
					<header className={styles.resources__header}>
						<h2 id="resources-heading" className={styles.resources__title}>
							Resources
						</h2>
						<p className={styles.resources__intro}>Some blogs and docs I turn to when learning and building.</p>
					</header>
					<div className={styles.resources__groups}>
						{A11Y_RESOURCES.map((group, index) => (
							// A div, not a <section>, so it isn't a region of its own inside Resources; its heading names the list instead.
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
			<Krispi pose="peek" says="Learned anything new?" className={styles.peek} />
		</>
	)
}
