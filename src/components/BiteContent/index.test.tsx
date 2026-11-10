import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Block } from '../../data/a11yBites'

import { BiteContent } from '.'

const renderBlocks = (blocks: Block[]) =>
	render(<BiteContent sections={[{ heading: { id: 'bite-1-section-1', label: '1.1', text: 'Section' }, isIssues: false, blocks }]} />)

describe('BiteContent', () => {
	it('sets the number of a point numbered in its text apart, also inside bold, and keeps the words', () => {
		renderBlocks([
			{ type: 'heading', level: 3, text: '1. The Native Table' },
			{ type: 'paragraph', text: '**2. The Unique Label Rule** - Label every `<nav>`.' },
		])

		expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('1. The Native Table')
		expect(screen.getByText('1.')).toHaveClass('number')
		expect(screen.getByText('2.')).toHaveClass('number')
		expect(screen.getByText('The Unique Label Rule').tagName).toBe('STRONG')
	})

	it('leaves text that does not start with a number alone', () => {
		renderBlocks([{ type: 'paragraph', text: 'In 2024. Things changed.' }])

		expect(screen.getByText('In 2024. Things changed.')).toBeInTheDocument()
		expect(document.querySelector('.number')).not.toBeInTheDocument()
	})

	it('labels a code example and names it for screen readers', () => {
		renderBlocks([{ type: 'code', code: '<div></div>' }])

		expect(screen.getByRole('group', { name: 'Example code, scrollable' })).toBeInTheDocument()
	})
})
