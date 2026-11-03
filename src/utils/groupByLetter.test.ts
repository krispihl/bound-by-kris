import { describe, expect, it } from 'vitest'

import type { Boardgame } from '../data/boardgames'

import { groupByLetter } from './groupByLetter'

const game = (title: string): Boardgame => ({ title, isExpansion: false, isEstonian: false })

describe('groupByLetter', () => {
	it('groups sorted games under their first letter, ignoring case', () => {
		expect(groupByLetter([game('Alias'), game('azul'), game('Bandido')])).toEqual([
			{ letter: 'A', games: [game('Alias'), game('azul')] },
			{ letter: 'B', games: [game('Bandido')] },
		])
	})

	it('puts titles starting with a digit or symbol under #', () => {
		expect(groupByLetter([game('6 võtab!'), game('7 wonders'), game('Azul')]).map((group) => group.letter)).toEqual(['#', 'A'])
	})

	it('keeps Estonian letters as their own groups', () => {
		expect(groupByLetter([game('Tõsiselt räägid?'), game('Õnneratas')]).map((group) => group.letter)).toEqual(['T', 'Õ'])
	})

	it('returns no groups for no games', () => {
		expect(groupByLetter([])).toEqual([])
	})
})
