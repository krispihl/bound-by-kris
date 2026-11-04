import { describe, expect, it } from 'vitest'

import { matchesSearch } from './matchesSearch'

describe('matchesSearch', () => {
	it('finds the search anywhere in the text, ignoring case', () => {
		expect(matchesSearch('7 wonders duel', 'WONDERS')).toBe(true)
		expect(matchesSearch('7 wonders duel', 'azul')).toBe(false)
	})

	it('ignores accents on either side', () => {
		expect(matchesSearch('Mõttemeister', 'mottemeister')).toBe(true)
		expect(matchesSearch('6 võtab!', 'võtab')).toBe(true)
		expect(matchesSearch('Azul', 'Āzul')).toBe(true)
	})

	it('matches everything on an empty or blank search, and trims the ends', () => {
		expect(matchesSearch('Azul', '')).toBe(true)
		expect(matchesSearch('Azul', '   ')).toBe(true)
		expect(matchesSearch('Azul', ' azul ')).toBe(true)
	})
})
