import type { Boardgame } from '../data/boardgames'

export type LetterGroup = { letter: string; games: Boardgame[] }

// Groups games, already sorted by title, under their first letter. Titles starting with a digit or a symbol share '#',
// which sorts first.
export const groupByLetter = (games: Boardgame[]): LetterGroup[] => {
	const groups: LetterGroup[] = []

	games.forEach((game) => {
		const first = game.title.charAt(0).toLocaleUpperCase('et')
		const letter = /\p{L}/u.test(first) ? first : '#'
		const last = groups.at(-1)

		if (last?.letter === letter) {
			last.games.push(game)
		} else {
			groups.push({ letter, games: [game] })
		}
	})

	return groups
}
