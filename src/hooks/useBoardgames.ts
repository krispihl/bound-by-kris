import { useCallback, useEffect, useState } from 'react'

import type { Boardgame } from '../data/boardgames'
import { BOARDGAMES_CSV_URL } from '../data/boardgames'
import { parseCsv } from '../utils/parseCsv'
import { toBoardgames } from '../utils/toBoardgames'

export type BoardgamesState = { status: 'loading' } | { status: 'error' } | { status: 'success'; games: Boardgame[] }

// Loads the games from the published sheet. A failed request, or a sheet with no usable rows, ends in the error state,
// which `retry` starts over from.
export const useBoardgames = () => {
	const [state, setState] = useState<BoardgamesState>({ status: 'loading' })
	const [attempt, setAttempt] = useState(0)

	useEffect(() => {
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
