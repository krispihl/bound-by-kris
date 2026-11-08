import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Cursor } from '.'

// The setup file's matchMedia matches nothing, as on a touch screen; this one matches, as with a mouse.
const useMouse = () => {
	const matchMedia = window.matchMedia
	vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ ...matchMedia(query), matches: true }))
}

afterEach(() => {
	vi.restoreAllMocks()
})

describe('Cursor', () => {
	it('fades in once the pointer moves', async () => {
		useMouse()
		const { container } = render(<Cursor />)
		const glow = container.firstElementChild

		expect(glow).not.toHaveClass(/cursor--visible/)
		await userEvent.pointer({ target: document.body, coords: { clientX: 40, clientY: 60 } })
		expect(glow).toHaveClass(/cursor--visible/)
	})

	it('fades out over a link and back in when the pointer moves off it', async () => {
		useMouse()
		const { container } = render(
			<>
				<Cursor />
				<a href="/about">About</a>
			</>
		)
		const glow = container.firstElementChild

		await userEvent.pointer({ target: screen.getByRole('link', { name: 'About' }) })
		expect(glow).toHaveClass(/cursor--faded/)
		await userEvent.pointer({ target: document.body })
		expect(glow).not.toHaveClass(/cursor--faded/)
	})

	it('is drawn above the header bar, but stays under its menu while the menu shows', async () => {
		useMouse()
		const { container, rerender } = render(
			<>
				<Cursor />
				<header data-site-header>
					<button>Menu</button>
					<nav style={{ visibility: 'hidden' }} />
				</header>
			</>
		)
		const glow = container.firstElementChild

		await userEvent.pointer({ target: screen.getByRole('button', { name: 'Menu' }) })
		expect(glow).toHaveClass(/cursor--raised/)

		rerender(
			<>
				<Cursor />
				<header data-site-header>
					<button>Close</button>
					<nav style={{ visibility: 'visible' }} />
				</header>
			</>
		)
		await userEvent.pointer({ target: screen.getByRole('button', { name: 'Close' }) })
		expect(glow).not.toHaveClass(/cursor--raised/)
	})

	it('is hidden from screen readers', () => {
		useMouse()
		const { container } = render(<Cursor />)

		expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
	})

	it('ignores a header that is not the site bar', async () => {
		useMouse()
		const { container } = render(
			<>
				<Cursor />
				<header>
					<button>Page header</button>
				</header>
			</>
		)

		await userEvent.pointer({ target: screen.getByRole('button', { name: 'Page header' }) })
		expect(container.firstElementChild).not.toHaveClass(/cursor--raised/)
	})

	it('appears and disappears when the media query starts and stops matching', () => {
		let matches = false
		let onChange = () => {}
		vi.spyOn(window, 'matchMedia').mockImplementation(
			(query) =>
				({
					get matches() {
						return matches
					},
					media: query,
					addEventListener: (_type: string, listener: () => void) => {
						onChange = listener
					},
					removeEventListener: () => {},
				}) as unknown as MediaQueryList
		)
		const { container } = render(<Cursor />)
		expect(container).toBeEmptyDOMElement()

		matches = true
		act(() => onChange())
		expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')

		matches = false
		act(() => onChange())
		expect(container).toBeEmptyDOMElement()
	})

	it('is left out without a mouse or when less motion is asked for', () => {
		const { container } = render(<Cursor />)

		expect(container).toBeEmptyDOMElement()
	})
})
