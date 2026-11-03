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
			{ title: 'Alias', players: '4–12 players', isExpansion: false, isEstonian: true },
			{ title: 'Azul', players: '2–4 players', isExpansion: false, isEstonian: false },
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
			{ title: 'UNO Cars', players: '2–10 players', isExpansion: false, isEstonian: false },
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
})
