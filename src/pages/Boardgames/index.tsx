import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { ExternalLink } from '../../components/ExternalLink'
import { PageHeading } from '../../components/PageHeading'
import { Spinner } from '../../components/Spinner'
import { useBoardgames } from '../../hooks/useBoardgames'
import { useCanonicalUrl } from '../../hooks/useCanonicalUrl'
import { usePageTitle } from '../../hooks/usePageTitle'
import { groupByLetter } from '../../utils/groupByLetter'
import { matchesSearch } from '../../utils/matchesSearch'

import styles from './index.module.css'

// A screen reader skips the dash of a range such as '2 – 10 players' without saying anything, so it gets "to" instead.
const Players = ({ players }: { players: string }) => {
	const spoken = players.replace(' – ', ' to ')
	if (spoken === players) {
		return players
	}

	return (
		<>
			<span aria-hidden="true">{players}</span>
			<span className="screenreader-only">{spoken}</span>
		</>
	)
}

export const Boardgames = () => {
	usePageTitle('Board games')
	useCanonicalUrl('/boardgames')

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
			<div className={styles.page__header}>
				<PageHeading className={styles.page__title}>Board games</PageHeading>
			</div>

			{/* Always in the page and empty until there is something to say. */}
			<div role="status" className="screenreader-only">
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
							{groupByLetter(found).map((group) => (
								<div key={group.letter} className={styles.group}>
									<h2 className={styles.group__letter} aria-label={group.letter === '#' ? 'Numbers and symbols' : undefined}>
										{group.letter}
									</h2>
									<ul className={styles.list}>
										{group.games.map((game, index) => (
											<li key={`${game.title}-${index}`}>
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
													{game.isExpansion ? (
														<span className={styles.tag}>Expansion</span>
													) : game.players ? (
														<Players players={game.players} />
													) : null}
													{game.isEstonian ? (
														<span className={cx(styles.tag, styles['tag--language'])}>Estonian</span>
													) : null}
												</p>
											</li>
										))}
									</ul>
								</div>
							))}
							{/* Where the skip link lands. Focusable from script only, so the next Tab goes on to what follows the list,
							    and a screen reader says where focus went. */}
							<p id="games-end" className="screenreader-only" tabIndex={-1}>
								End of the games list
							</p>
						</>
					)}
				</>
			) : null}
		</div>
	)
}
