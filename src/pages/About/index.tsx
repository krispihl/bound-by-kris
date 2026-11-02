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
						<div className={styles.section__body}>
							{section.summary?.map((paragraph) => (
								<p key={paragraph} className={styles.section__summary}>
									{paragraph}
								</p>
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
													<div className={styles.entry__text}>
														<h3 className={styles.entry__title}>{entry.title}</h3>
														{entry.detail ? <p className={styles.entry__detail}>{entry.detail}</p> : null}
														{entry.steps ? (
															<ul className={styles.entry__steps}>
																{entry.steps.map((step) => (
																	<li key={step}>{step}</li>
																))}
															</ul>
														) : null}
													</div>
													{entry.period ? <p className={styles.entry__period}>{entry.period}</p> : null}
												</div>
												{entry.roles ? (
													<ul className={styles.roles}>
														{entry.roles.map((role) => (
															<li key={role.title} className={styles.role}>
																<h4 className={styles.role__title}>{role.title}</h4>
																<ul className={styles.highlights}>
																	{role.highlights.map((highlight) => (
																		<li key={highlight}>{highlight}</li>
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
		</div>
	)
}
