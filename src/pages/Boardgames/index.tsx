import { useState } from 'react'

import { ExternalLink } from '../../components/ExternalLink'
import { Spinner } from '../../components/Spinner'
import { useBoardgames } from '../../hooks/useBoardgames'
import { groupByLetter } from '../../utils/groupByLetter'
import { matchesSearch } from '../../utils/matchesSearch'

import styles from './index.module.css'

export const Boardgames = () => {
	const { state, retry } = useBoardgames()
	const [search, setSearch] = useState('')

	const games = state.status === 'success' ? state.games : []
	const found = games.filter((game) => matchesSearch(game.title, search))
	const isSearching = search.trim() !== ''

	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<h1 className={styles.page__title}>Board games</h1>
			</header>

			{state.status === 'loading' ? <Spinner label="Loading the games…" /> : null}

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
					<search className={styles.search}>
						<label className={styles.search__label} htmlFor="game-search">
							Search games
						</label>
						<input
							id="game-search"
							className={styles.search__input}
							type="search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							autoComplete="off"
							spellCheck={false}
						/>
					</search>

					{/* Read out as it changes, so screen reader users hear how many games are left without leaving the search box. */}
					<p className={styles.count} aria-live="polite">
						{isSearching ? `${found.length} of ${games.length} games` : `${games.length} games on my shelf`}
					</p>

					{found.length === 0 ? (
						<p className={styles.status}>No games match “{search.trim()}”.</p>
					) : (
						<div className={styles.groups}>
							{groupByLetter(found).map((group) => (
								<section key={group.letter} className={styles.group} aria-labelledby={`letter-${group.letter}`}>
									<h2 id={`letter-${group.letter}`} className={styles.group__letter}>
										{group.letter}
									</h2>
									<ul className={styles.list}>
										{group.games.map((game) => (
											<li key={game.title}>
												<article>
													<h3 className={styles.game__title}>
														{game.link ? (
															<ExternalLink className={styles.game__link} href={game.link}>
																{game.title}
															</ExternalLink>
														) : (
															game.title
														)}
													</h3>
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
					)}
				</>
			) : null}
		</div>
	)
}
