import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ExternalLink } from '.'

describe('ExternalLink', () => {
	it('opens in a new tab and says so in its accessible name', () => {
		render(<ExternalLink href="https://boardgamegeek.com/boardgame/230802/azul">Azul</ExternalLink>)

		const link = screen.getByRole('link', { name: /^Azul\s*\(opens in a new tab\)$/ })
		expect(link).toHaveAttribute('href', 'https://boardgamegeek.com/boardgame/230802/azul')
		expect(link).toHaveAttribute('target', '_blank')
		expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
	})

	it('hides the icon from screen readers', () => {
		render(<ExternalLink href="https://example.com">Example</ExternalLink>)

		expect(screen.getByRole('link').querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
	})

	it('keeps the last word with the icon without changing the name', () => {
		render(<ExternalLink href="https://example.com">Black stories junior: School Stories</ExternalLink>)

		const link = screen.getByRole('link', { name: /^Black stories junior: School Stories\s*\(opens in a new tab\)$/ })
		expect(link.querySelector('svg')?.parentElement).toHaveTextContent(/^Stories$/)
	})
})
