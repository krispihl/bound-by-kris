import cx from 'classnames'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { ExternalLink } from '../../components/ExternalLink'
import { Krispi } from '../../components/Krispi'
import { PageHeading } from '../../components/PageHeading'
import type { CvLink, CvParagraph } from '../../data/cv'
import { CV_SECTIONS, paragraphText } from '../../data/cv'
import { useScrolledToBottom } from '../../hooks/useScrolledToBottom'
import { usePageTitle } from '../../hooks/usePageTitle'

import styles from './index.module.css'

// A link in a paragraph: to a page on this site, or to the other site in a new tab.
const SectionLink = ({ link }: { link: CvLink }) =>
	'href' in link ? (
		<ExternalLink className={styles.section__link} href={link.href}>
			{link.text}
		</ExternalLink>
	) : (
		<Link className={styles.section__link} to={link.to}>
			{link.text}
			<FiArrowRight className={styles['section__link-icon']} aria-hidden="true" />
		</Link>
	)

// A paragraph of text, with its links, if it has any, among the words.
const SummaryParagraph = ({ paragraph }: { paragraph: CvParagraph }) => (
	<p className={styles.section__summary}>
		{typeof paragraph === 'string'
			? paragraph
			: paragraph.map((part, index) => (typeof part === 'string' ? part : <SectionLink key={index} link={part} />))}
	</p>
)

export const About = () => {
	usePageTitle('About')
	const atBottom = useScrolledToBottom()

	return (
		<>
			<div className={styles.page}>
				<div className={styles.page__header}>
					<PageHeading className={styles.page__title}>About</PageHeading>
					<p className={styles.page__intro}>Overview of my background and skills.</p>
				</div>

				{CV_SECTIONS.map((section) => {
					// The summary that is also in the PDF, then the paragraphs only the site has.
					const paragraphs = [...(section.summary ?? []), ...(section.webSummary ?? [])]

					return (
						<section key={section.id} className={styles.section}>
							<span className={styles.section__number} aria-hidden="true" />
							<h2 className={styles.section__heading}>{section.heading}</h2>
							<div className={styles.section__body}>
								{paragraphs.map((paragraph) => (
									<SummaryParagraph key={paragraphText(paragraph)} paragraph={paragraph} />
								))}
								{section.tags ? (
									<ul className={styles.tags} aria-label="Skills">
										{section.tags.map((tag) => (
											<li key={tag} className={styles.tag}>
												{tag}
											</li>
										))}
									</ul>
								) : null}
								{section.entries.length > 0 ? (
									<ul className={styles.section__list}>
										{section.entries.map((entry) =>
											entry.note ? (
												<li key={entry.title} className={styles.note}>
													{entry.title}
												</li>
											) : (
												<li key={entry.title} className={styles.entry}>
													<div className={styles.entry__head}>
														<h3 className={styles.entry__title}>{entry.title}</h3>
														{entry.period ? <p className={styles.entry__period}>{entry.period}</p> : null}
														{entry.detail ? <p className={styles.entry__detail}>{entry.detail}</p> : null}
														{entry.steps ? (
															<ol className={styles.entry__steps}>
																{entry.steps.map((step) => (
																	<li
																		key={step.title}
																		className={cx(styles.step, step.current && styles['step--current'])}
																	>
																		<span className={styles.step__title}>
																			{step.title}
																			{step.current ? (
																				<span className="screenreader-only"> (current role)</span>
																			) : null}
																		</span>
																		{step.period ? (
																			<span className={styles.step__period}>{step.period}</span>
																		) : null}
																		{step.detail ? (
																			<span className={styles.step__detail}>{step.detail}</span>
																		) : null}
																	</li>
																))}
															</ol>
														) : null}
													</div>
													{entry.roles ? (
														<ul className={styles.roles}>
															{entry.roles.map((role) => (
																<li key={role.title} className={styles.role}>
																	<h4 className={styles.role__title}>{role.title}</h4>
																	{role.stats ? (
																		<ul className={styles.stats} aria-label="Key results">
																			{role.stats.map((stat) => (
																				<li key={stat} className={styles.stat}>
																					{stat}
																				</li>
																			))}
																		</ul>
																	) : null}
																	<ul className={styles.highlights}>
																		{role.highlights.map((highlight) => (
																			<li key={highlight.label} className={styles.highlight}>
																				<strong className={styles.highlight__label}>{highlight.label}</strong>
																				<p className={styles.highlight__text}>{highlight.text}</p>
																			</li>
																		))}
																	</ul>
																</li>
															))}
														</ul>
													) : null}
												</li>
											)
										)}
									</ul>
								) : null}
							</div>
						</section>
					)
				})}

				<div className={styles.page__footer}>
					{/* A plain link, not a router one, so the browser opens the PDF in its own viewer with download and print. */}
					<ExternalLink className={styles.page__cv} href="/kristina-pihl-cv.pdf">
						Printable CV (PDF)
					</ExternalLink>
				</div>
			</div>
			{/* Outside the page, whose container query would otherwise pin this fixed element to the page instead of the window. */}
			<Krispi glances className={cx(styles.peek, atBottom && styles['peek--up'])} />
		</>
	)
}
