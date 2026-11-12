import { describe, expect, it } from 'vitest'

import { toBoardgames } from './toBoardgames'

describe('toBoardgames', () => {
	it('maps rows to games by their header names', () => {
		const rows = [
			['GAME', 'PLAYERS', 'LANGUGAGE', 'NOTES'],
			['Azul', '2 - 4', '', 'a note'],
			['Alias', '4 - 12', 'EST', ''],
		]

		expect(toBoardgames(rows)).toEqual([
			{ title: 'Alias', players: '4 – 12 players', isExpansion: false, isEstonian: true },
			{ title: 'Azul', players: '2 – 4 players', isExpansion: false, isEstonian: false },
		])
	})

	it('marks expansions and formats single and unevenly spaced player counts', () => {
		const rows = [
			['GAME', 'PLAYERS', 'LANGUAGE'],
			['7 wonders leaders', 'Expansion', ''],
			['Solo game', '1', ''],
			['UNO Cars', '2 -10', ''],
		]

		expect(toBoardgames(rows)).toEqual([
			{ title: '7 wonders leaders', players: undefined, isExpansion: true, isEstonian: false },
			{ title: 'Solo game', players: '1 player', isExpansion: false, isEstonian: false },
			{ title: 'UNO Cars', players: '2 – 10 players', isExpansion: false, isEstonian: false },
		])
	})

	it('keeps web links from the LINK column and drops anything else', () => {
		const rows = [
			['GAME', 'PLAYERS', 'LANGUAGE', 'NOTES', 'LINK'],
			['Azul', '2 - 4', '', '', ' https://boardgamegeek.com/boardgame/230802/azul '],
			['Mõttemeister', '2', 'EST', '', ''],
			['Bad', '2', '', '', 'javascript:alert(1)'],
			['Typo', '2', '', '', 'boardgamegeek.com/boardgame/1'],
		]

		expect(toBoardgames(rows).map((game) => [game.title, game.link])).toEqual([
			['Azul', 'https://boardgamegeek.com/boardgame/230802/azul'],
			['Bad', undefined],
			['Mõttemeister', undefined],
			['Typo', undefined],
		])
	})

	it('skips rows without a game name', () => {
		expect(
			toBoardgames([
				['GAME', 'PLAYERS'],
				['', '2'],
				['  ', '3'],
				['Azul', ''],
			])
		).toEqual([{ title: 'Azul', players: undefined, isExpansion: false, isEstonian: false }])
	})

	it('returns no games without a header or a GAME column', () => {
		expect(toBoardgames([])).toEqual([])
		expect(toBoardgames([['NAME'], ['Azul']])).toEqual([])
	})

	it('keeps a title language code from the TITLE LANG column and drops anything else', () => {
		const rows = [
			['GAME', 'PLAYERS', 'LANGUAGE', 'TITLE LANG'],
			['Hundimäng', '8 - 18', 'EST', ' et '],
			['Codenames', '2 - 8', 'EST', ''],
			['Typo', '2', '', 'Estonian'],
		]

		expect(toBoardgames(rows).map(({ title, titleLang }) => ({ title, titleLang }))).toEqual([
			{ title: 'Codenames', titleLang: undefined },
			{ title: 'Hundimäng', titleLang: 'et' },
			{ title: 'Typo', titleLang: undefined },
		])
	})
})
