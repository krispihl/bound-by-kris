import type { Boardgame } from '../data/boardgames'

const findColumn = (header: string[], pattern: RegExp) => header.findIndex((cell) => pattern.test(cell.trim()))

// '2 - 4' → '2–4 players', '1' → '1 player'; anything else is shown as written.
const formatPlayers = (value: string) => {
	const range = /^(\d+)\s*-\s*(\d+)$/.exec(value)
	if (range) {
		return `${range[1]}–${range[2]} players`
	}
	if (/^\d+$/.test(value)) {
		return `${value} ${value === '1' ? 'player' : 'players'}`
	}
	return value
}

// Turns the sheet's rows into games, sorted by title. Columns are found by their header names (the language one only by
// its start, so a typo there still matches), and rows without a game name are skipped.
export const toBoardgames = (rows: string[][]): Boardgame[] => {
	const [header, ...body] = rows
	if (!header) {
		return []
	}

	const titleColumn = findColumn(header, /^game$/i)
	const playersColumn = findColumn(header, /^players$/i)
	const languageColumn = findColumn(header, /^lang/i)
	if (titleColumn === -1) {
		return []
	}

	return body
		.flatMap((row): Boardgame[] => {
			const title = row[titleColumn]?.trim()
			if (!title) {
				return []
			}
			const players = row[playersColumn]?.trim() ?? ''
			const isExpansion = /^expansion$/i.test(players)

			return [
				{
					title,
					players: players && !isExpansion ? formatPlayers(players) : undefined,
					isExpansion,
					isEstonian: /^est$/i.test(row[languageColumn]?.trim() ?? ''),
				},
			]
		})
		.sort((a, b) => a.title.localeCompare(b.title, 'et'))
}
