import { useEffect, useRef, useState } from 'react'

import { ExternalLink } from '../../components/ExternalLink'
import { PageHeading } from '../../components/PageHeading'
import { Spinner } from '../../components/Spinner'
import { useBoardgames } from '../../hooks/useBoardgames'
import { usePageTitle } from '../../hooks/usePageTitle'
import { groupByLetter } from '../../utils/groupByLetter'
import { matchesSearch } from '../../utils/matchesSearch'

import styles from './index.module.css'

export const Boardgames = () => {
	usePageTitle('Board games')

	const { state, retry } = useBoardgames()
	const [search, setSearch] = useState('')
	const isRetrying = useRef(false)
	const searchRef = useRef<HTMLInputElement>(null)
	const retryRef = useRef<HTMLButtonElement>(null)

	// "Try again" is replaced by the spinner, so focus would fall back to the page. Once the retry settles, it goes to
	// the search field if the games loaded, or back to the button if they failed again.
	useEffect(() => {
		if (!isRetrying.current || state.status === 'loading') {
			return
		}
		isRetrying.current = false
		const target = state.status === 'success' ? searchRef.current : retryRef.current
		target?.focus()
	}, [state.status])

	const games = state.status === 'success' ? state.games : []
	const found = games.filter((game) => matchesSearch(game.title, search))
	const isSearching = search.trim() !== ''

	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<PageHeading className={styles.page__title}>Board games</PageHeading>
			</header>

			{/* Always in the page and empty until there is something to say. */}
			<div role="status" className="visually-hidden">
				{state.status === 'loading' ? 'Loading the games…' : null}
				{state.status === 'success' ? `${games.length} games loaded` : null}
			</div>

			{state.status === 'loading' ? <Spinner /> : null}

			{state.status === 'error' ? (
				<div className={styles.status} role="alert">
					<p className={styles.status__text}>The games list didn’t load.</p>
					<button
						ref={retryRef}
						className={styles.status__retry}
						onClick={() => {
							isRetrying.current = true
							retry()
						}}
					>
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
							ref={searchRef}
							id="game-search"
							className={styles.search__input}
							type="search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							autoComplete="off"
							spellCheck={false}
						/>
					</search>

					<div className={styles.summary}>
						{/* Read out as it changes, so screen reader users hear how many games are left without leaving the search box. */}
						<p className={styles.count} aria-live="polite">
							{isSearching ? `${found.length} of ${games.length} games` : `${games.length} games on my shelf`}
						</p>
						{/* Tabbing past every game takes well over a hundred presses, so keyboard users can jump to the end of the list
						    in one. Shows only once focused, as the first stop after the search, beside the count. */}
						{found.length > 0 ? (
							<a className={styles.skip} href="#games-end">
								Skip past the games list
							</a>
						) : null}
					</div>

					{found.length === 0 ? (
						<p className={styles.status}>No games match “{search.trim()}”.</p>
					) : (
						<>
							<div className={styles.groups}>
								{groupByLetter(found).map((group) => (
									// A div, not a <section>, so the letters don't each become a landmark region; their headings are enough to move by.
									<div key={group.letter} className={styles.group}>
										<h2 id={`letter-${group.letter}`} className={styles.group__letter}>
											{group.letter}
										</h2>
										<ul className={styles.list}>
											{group.games.map((game) => (
												<li key={game.title}>
													<article>
														<h3 className={styles.game__title} lang={game.titleLang}>
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
									</div>
								))}
							</div>
							{/* Where the skip link lands. Focusable from script only, so the next Tab goes on to what follows the list,
							    and a screen reader says where focus went. */}
							<p id="games-end" className="visually-hidden" tabIndex={-1}>
								End of the games list
							</p>
						</>
					)}
				</>
			) : null}
		</div>
	)
}
