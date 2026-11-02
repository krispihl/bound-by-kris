import { CV_SECTIONS } from '../../data/cv'

import styles from './index.module.css'

export const About = () => {
	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<h1 className={styles.page__title}>About</h1>
				<p className={styles.page__intro}>Overview of my professional background and skills.</p>
			</header>

			{CV_SECTIONS.map((section) => {
				const headingId = `about-${section.id}`

				return (
					<section key={section.id} className={styles.section} aria-labelledby={headingId}>
						<span className={styles.section__number} aria-hidden="true" />
						<h2 id={headingId} className={styles.section__heading}>
							{section.heading}
						</h2>
						<ul className={styles.section__list}>
							{section.entries.map((entry) =>
								entry.note ? (
									<li key={entry.title} className={styles.note}>
										{entry.title}
									</li>
								) : (
									<li key={entry.title} className={styles.entry}>
										<div className={styles.entry__text}>
											<h3 className={styles.entry__title}>{entry.title}</h3>
											{entry.detail ? <p className={styles.entry__detail}>{entry.detail}</p> : null}
										</div>
										{entry.period ? <p className={styles.entry__period}>{entry.period}</p> : null}
									</li>
								)
							)}
						</ul>
					</section>
				)
			})}
		</div>
	)
}
