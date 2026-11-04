import { useCallback, useEffect, useState } from 'react'

import type { Boardgame } from '../data/boardgames'
import { BOARDGAMES_CSV_URL } from '../data/boardgames'
import { parseCsv } from '../utils/parseCsv'
import { toBoardgames } from '../utils/toBoardgames'

export type BoardgamesState = { status: 'loading' } | { status: 'error' } | { status: 'success'; games: Boardgame[] }

// The games from the last successful load, kept for as long as the tab is open, so coming back to the page shows them
// straight away. A reload starts empty and fetches the sheet again, so edits to it still show up.
let cachedGames: Boardgame[] | null = null

// For tests, which each need to start from an empty cache.
export const clearBoardgamesCache = () => {
	cachedGames = null
}

// Loads the games from the published sheet, or uses the ones already loaded in this tab. A failed request, or a sheet
// with no usable rows, ends in the error state, which `retry` starts over from. Errors aren't cached.
export const useBoardgames = () => {
	const [state, setState] = useState<BoardgamesState>(() => (cachedGames ? { status: 'success', games: cachedGames } : { status: 'loading' }))
	const [attempt, setAttempt] = useState(0)

	useEffect(() => {
		if (cachedGames) return

		const controller = new AbortController()

		fetch(BOARDGAMES_CSV_URL, { signal: controller.signal })
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Boardgames request failed with ${response.status}`)
				}
				return response.text()
			})
			.then((text) => {
				const games = toBoardgames(parseCsv(text))
				if (games.length > 0) cachedGames = games
				setState(games.length > 0 ? { status: 'success', games } : { status: 'error' })
			})
			.catch(() => {
				if (!controller.signal.aborted) {
					setState({ status: 'error' })
				}
			})

		return () => controller.abort()
	}, [attempt])

	const retry = useCallback(() => {
		setState({ status: 'loading' })
		setAttempt((current) => current + 1)
	}, [])

	return { state, retry }
}
