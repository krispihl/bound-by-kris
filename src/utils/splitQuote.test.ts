import { describe, expect, it } from 'vitest'

import { splitQuote } from './splitQuote'

describe('splitQuote', () => {
	it('splits the author off after the closing quote mark', () => {
		expect(splitQuote('“Accessible design is good design” — Steve Ballmer')).toEqual({
			quote: '“Accessible design is good design”',
			author: 'Steve Ballmer',
		})
	})

	it('accepts the other dashes used before the author', () => {
		expect(splitQuote('“One.” ― Debra Ruh').author).toBe('Debra Ruh')
		expect(splitQuote('“Two.” – Tim Berners-Lee').author).toBe('Tim Berners-Lee')
		expect(splitQuote('“Three” - Alistair Duggin').author).toBe('Alistair Duggin')
	})

	it('keeps a dash inside the quote as part of the quote', () => {
		expect(splitQuote('“A – B.” — Per Axbom')).toEqual({ quote: '“A – B.”', author: 'Per Axbom' })
	})

	it('returns the whole text when there is no author', () => {
		expect(splitQuote('“No author here.”')).toEqual({ quote: '“No author here.”' })
	})
})
