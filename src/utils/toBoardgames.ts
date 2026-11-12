import type { Boardgame } from '../data/boardgames'

const findColumn = (header: string[], pattern: RegExp) => header.findIndex((cell) => pattern.test(cell.trim()))

// '2 - 4' → '2 – 4 players', '1' → '1 player'; anything else is shown as written.
const formatPlayers = (value: string) => {
	const range = /^(\d+)\s*-\s*(\d+)$/.exec(value)
	if (range) {
		return `${range[1]} – ${range[2]} players`
	}
	if (/^\d+$/.test(value)) {
		return `${value} ${value === '1' ? 'player' : 'players'}`
	}
	return value
}

// The sheet can be edited by hand, so only web addresses are kept as links; anything else, like a typo or a
// `javascript:` URL, is dropped.
const toLink = (value: string) => {
	try {
		const url = new URL(value)
		return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : undefined
	} catch {
		return undefined
	}
}

// A language code such as 'et' or 'en-GB'; anything else in the cell is ignored rather than put in a lang attribute.
const toLang = (value: string) => (/^[a-z]{2,3}(-[a-z]{2})?$/i.test(value) ? value : undefined)

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
	const linkColumn = findColumn(header, /^link$/i)
	const titleLangColumn = findColumn(header, /^title lang/i)
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
			const link = toLink(row[linkColumn]?.trim() ?? '')

			return [
				{
					title,
					players: players && !isExpansion ? formatPlayers(players) : undefined,
					isExpansion,
					isEstonian: /^est$/i.test(row[languageColumn]?.trim() ?? ''),
					titleLang: toLang(row[titleLangColumn]?.trim() ?? ''),
					link,
				},
			]
		})
		.sort((a, b) => a.title.localeCompare(b.title, 'et'))
}
