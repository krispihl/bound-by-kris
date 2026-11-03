import { useBoardgames } from '../../hooks/useBoardgames'
import { groupByLetter } from '../../utils/groupByLetter'

import styles from './index.module.css'

export const Boardgames = () => {
	const { state, retry } = useBoardgames()

	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<h1 className={styles.page__title}>Boardgames</h1>
				<p className={styles.page__intro}>Fancy to play a game or two?</p>
			</header>

			{state.status === 'loading' ? (
				<p className={styles.status} role="status">
					Loading the games…
				</p>
			) : null}

			{state.status === 'error' ? (
				<div className={styles.status} role="alert">
					<p className={styles.status__text}>The games list didn’t load.</p>
					<button type="button" className={styles.status__retry} onClick={retry}>
						Try again
					</button>
				</div>
			) : null}

			{state.status === 'success' ? (
				<>
					<p className={styles.count}>{state.games.length} games on my shelf</p>
					<div className={styles.groups}>
						{groupByLetter(state.games).map((group) => (
							<section key={group.letter} className={styles.group} aria-labelledby={`letter-${group.letter}`}>
								<h2 id={`letter-${group.letter}`} className={styles.group__letter}>
									{group.letter}
								</h2>
								<ul className={styles.list}>
									{group.games.map((game) => (
										<li key={game.title}>
											<article>
												<h3 className={styles.game__title}>{game.title}</h3>
												<p className={styles.game__meta}>
													{game.isExpansion ? <span className={styles.tag}>Expansion</span> : game.players}
													{game.isEstonian ? (
														<span className={`${styles.tag} ${styles['tag--language']}`}>Estonian</span>
													) : null}
												</p>
											</article>
										</li>
									))}
								</ul>
							</section>
						))}
					</div>
				</>
			) : null}
		</div>
	)
}
