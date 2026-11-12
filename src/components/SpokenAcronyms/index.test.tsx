import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SpokenAcronyms } from '.'

describe('SpokenAcronyms', () => {
	it('shows SEO as written but names it letter by letter', () => {
		render(
			<p>
				<SpokenAcronyms text="Growth and SEO work" />
			</p>
		)

		expect(screen.getByText('SEO')).toBeVisible()
		expect(screen.getByText('S E O')).toHaveClass('screenreader-only')
		expect(screen.getByText('SEO').closest('p')).toHaveTextContent('Growth and SEOS E O work')
	})

	it('names A/B without the slash', () => {
		render(
			<p>
				<SpokenAcronyms text="Led A/B tests" />
			</p>
		)

		expect(screen.getByText('A/B')).toBeVisible()
		expect(screen.getByText('A B')).toHaveClass('screenreader-only')
	})

	it('says bikepacking as two words', () => {
		render(
			<p>
				<SpokenAcronyms text="Cycling, bikepacking" />
			</p>
		)

		expect(screen.getByText('bikepacking')).toBeVisible()
		expect(screen.getByText('bike packing')).toHaveClass('screenreader-only')
	})

	it('leaves text without an acronym alone, and does not match inside a word', () => {
		render(
			<p>
				<SpokenAcronyms text="Seo and SEOUL" />
			</p>
		)

		expect(screen.getByText('Seo and SEOUL')).toBeInTheDocument()
	})
})
