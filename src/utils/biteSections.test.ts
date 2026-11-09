import { describe, expect, it } from 'vitest'

import type { A11yBite } from '../data/a11yBites'

import { getBiteSections } from './biteSections'

describe('getBiteSections', () => {
	it('groups blocks under each top-level heading and numbers them after the bite', () => {
		const blocks: A11yBite['content'] = [
			{ type: 'heading', level: 2, text: 'What' },
			{ type: 'paragraph', text: 'One' },
			{ type: 'heading', level: 3, text: 'Detail' },
			{ type: 'heading', level: 2, text: 'Common pitfalls' },
			{ type: 'paragraph', text: 'Two' },
		]

		const sections = getBiteSections(blocks, 1)

		expect(sections).toHaveLength(2)
		expect(sections[0]).toMatchObject({ heading: { id: 'bite-1-section-1', label: '1.1', text: 'What' }, isIssues: false })
		expect(sections[0].blocks).toHaveLength(2)
		expect(sections[1]).toMatchObject({ heading: { id: 'bite-1-section-2', label: '1.2' }, isIssues: true })
	})
})
