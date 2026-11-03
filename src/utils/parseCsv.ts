// Splits CSV text into rows of cells. Handles quoted cells, including commas, line breaks and doubled quotes inside them.
export const parseCsv = (text: string): string[][] => {
	const rows: string[][] = []
	let row: string[] = []
	let cell = ''
	let inQuotes = false

	for (let index = 0; index < text.length; index++) {
		const char = text[index]

		if (inQuotes) {
			if (char === '"' && text[index + 1] === '"') {
				cell += '"'
				index++
			} else if (char === '"') {
				inQuotes = false
			} else {
				cell += char
			}
		} else if (char === '"') {
			inQuotes = true
		} else if (char === ',') {
			row.push(cell)
			cell = ''
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && text[index + 1] === '\n') {
				index++
			}
			row.push(cell)
			rows.push(row)
			row = []
			cell = ''
		} else {
			cell += char
		}
	}

	if (cell || row.length) {
		row.push(cell)
		rows.push(row)
	}

	return rows
}
