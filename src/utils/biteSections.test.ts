import { describe, expect, it } from 'vitest'

import type { A11yBite } from '../data/a11yBites'

import { getBiteSections } from './biteSections'

describe('getBiteSections', () => {
	it('numbers the sections after the bite and keeps their blocks', () => {
		const bite: A11yBite = {
			number: 1,
			title: 'Skip links',
			summary: 'Summary',
			sections: [
				{
					heading: 'What',
					blocks: [
						{ type: 'paragraph', text: 'One' },
						{ type: 'heading', level: 3, text: 'Detail' },
					],
				},
				{ heading: 'Common pitfalls', isIssues: true, blocks: [{ type: 'paragraph', text: 'Two' }] },
			],
		}

		const sections = getBiteSections(bite)

		expect(sections).toHaveLength(2)
		expect(sections[0]).toMatchObject({ heading: { id: 'bite-1-section-1', label: '1.1', text: 'What' }, isIssues: false })
		expect(sections[0].blocks).toHaveLength(2)
		expect(sections[1]).toMatchObject({ heading: { id: 'bite-1-section-2', label: '1.2' }, isIssues: true })
	})
})
