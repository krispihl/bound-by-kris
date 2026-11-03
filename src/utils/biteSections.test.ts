import { describe, expect, it } from 'vitest'

import type { Block } from '../data/a11yBites'

import { getBiteSections, stripLeadingEmoji } from './biteSections'

describe('stripLeadingEmoji', () => {
	it('removes a leading emoji and the space after it', () => {
		expect(stripLeadingEmoji('🎯 What are Skip Links?')).toBe('What are Skip Links?')
		expect(stripLeadingEmoji('❓ Why we need them?')).toBe('Why we need them?')
	})

	it('leaves text without a leading emoji alone', () => {
		expect(stripLeadingEmoji('The WCAG compliance matrix')).toBe('The WCAG compliance matrix')
	})
})

describe('getBiteSections', () => {
	it('groups blocks under each top-level heading and numbers them after the bite', () => {
		const blocks: Block[] = [
			{ type: 'heading', level: 2, text: '🎯 What' },
			{ type: 'paragraph', text: 'One' },
			{ type: 'heading', level: 3, text: 'Detail' },
			{ type: 'heading', level: 2, text: '🚨 Common pitfalls' },
			{ type: 'paragraph', text: 'Two' },
		]

		const sections = getBiteSections(blocks, 1)

		expect(sections).toHaveLength(2)
		expect(sections[0]).toMatchObject({ heading: { id: 'bite-1-section-1', label: '1.1', text: 'What' }, isIssues: false })
		expect(sections[0].blocks).toHaveLength(2)
		expect(sections[1]).toMatchObject({ heading: { id: 'bite-1-section-2', label: '1.2' }, isIssues: true })
	})

	it('keeps blocks before the first heading in a section without a heading', () => {
		const sections = getBiteSections([{ type: 'paragraph', text: 'Intro' }], 2)

		expect(sections).toEqual([{ isIssues: false, blocks: [{ type: 'paragraph', text: 'Intro' }] }])
	})
})
