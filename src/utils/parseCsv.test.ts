import { describe, expect, it } from 'vitest'

import { parseCsv } from './parseCsv'

describe('parseCsv', () => {
	it('splits lines into rows and commas into cells, keeping empty cells', () => {
		expect(parseCsv('GAME,PLAYERS,LANGUAGE\nAzul,2 - 4,\nAlias,4 - 12,EST')).toEqual([
			['GAME', 'PLAYERS', 'LANGUAGE'],
			['Azul', '2 - 4', ''],
			['Alias', '4 - 12', 'EST'],
		])
	})

	it('keeps commas, line breaks and doubled quotes inside quoted cells', () => {
		expect(parseCsv('"Mees, kes teadis ussisõnu",2 - 5\n"Line one\nline two","Say ""hi"""')).toEqual([
			['Mees, kes teadis ussisõnu', '2 - 5'],
			['Line one\nline two', 'Say "hi"'],
		])
	})

	it('handles Windows line endings and a trailing line break', () => {
		expect(parseCsv('a,b\r\nc,d\r\n')).toEqual([
			['a', 'b'],
			['c', 'd'],
		])
	})

	it('returns no rows for empty text', () => {
		expect(parseCsv('')).toEqual([])
	})
})
