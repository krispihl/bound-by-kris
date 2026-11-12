import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichText } from '.'

describe('RichText', () => {
	it('renders code, bold and italic spans', () => {
		render(<RichText text="Use `aria-label` on **buttons** and *links*" />)

		expect(screen.getByText('aria-label').tagName).toBe('CODE')
		expect(screen.getByText('buttons').tagName).toBe('STRONG')
		expect(screen.getByText('links').tagName).toBe('EM')
	})

	it('names a lone tag as an element for screen readers, and leaves longer code as written', () => {
		render(<RichText text='Use `<nav>` not `<div role="navigation">`' />)

		expect(screen.getByText('<nav>')).toHaveAttribute('aria-hidden', 'true')
		expect(screen.getByText('nav element')).toHaveClass('screenreader-only')
		expect(screen.getByText('<div role="navigation">').tagName).toBe('CODE')
	})

	it('renders http links with their href', () => {
		render(<RichText text="See [WCAG](https://www.w3.org/WAI/WCAG21/)" />)

		expect(screen.getByRole('link', { name: /WCAG/ })).toHaveAttribute('href', 'https://www.w3.org/WAI/WCAG21/')
	})

	it('starts a new line at a newline', () => {
		const { container } = render(<RichText text={'First line\nSecond line'} />)

		expect(container.querySelector('br')).toBeInTheDocument()
		expect(container).toHaveTextContent('First lineSecond line')
	})

	it('gives labelled text an image role and a label for screen readers', () => {
		render(<RichText text="Ban emoticons {===|strictly equals} yes" />)

		expect(screen.getByRole('img', { name: 'strictly equals' })).toHaveTextContent('===')
	})

	it('hides bare emoji from screen readers and keeps the words', () => {
		const { container } = render(<RichText text="Launch day 🚀 and a sigh 😮‍💨." />)

		expect(screen.queryByRole('img')).not.toBeInTheDocument()
		expect(screen.getByText('🚀')).toHaveAttribute('aria-hidden', 'true')
		expect(screen.getByText('😮‍💨')).toHaveAttribute('aria-hidden', 'true')
		expect(container).toHaveTextContent('Launch day 🚀 and a sigh 😮‍💨.')
	})

	it('labels an emoji inside bold text and leaves emoji in code alone', () => {
		render(<RichText text="**Say {💀|skull}** and `🙏`" />)

		expect(screen.getByRole('img', { name: 'skull' })).toHaveTextContent('💀')
		expect(screen.getByText('🙏').tagName).toBe('CODE')
	})

	it('leaves unmatched markers and non-http links as plain text', () => {
		render(<RichText text="2 * 3 and [x](javascript:alert(1))" />)

		expect(screen.queryByRole('link')).not.toBeInTheDocument()
		expect(screen.getByText(/2 \* 3/)).toBeInTheDocument()
	})
})
