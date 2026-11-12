import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { A11Y_BITES } from '../../data/a11yBites'

import { A11yBites } from '.'

describe('A11yBites', () => {
	it('renders a collapsed toggle for every bite under a page heading', () => {
		render(<A11yBites />)

		expect(screen.getByRole('heading', { level: 1, name: 'accessibility bites' })).toBeInTheDocument()

		// Krispi's dismiss button is the only other button on the page, and it doesn't expand anything.
		const toggles = screen.getAllByRole('button').filter((button) => button.hasAttribute('aria-expanded'))
		expect(toggles).toHaveLength(A11Y_BITES.length)
		toggles.forEach((toggle) => expect(toggle).toHaveAttribute('aria-expanded', 'false'))
	})

	it('expands a bite on click and collapses it on a second click', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		const toggle = screen.getByRole('button', { name: 'Skip links' })
		await user.click(toggle)

		expect(toggle).toHaveAttribute('aria-expanded', 'true')
		const region = screen.getByRole('region', { name: 'Skip links' })
		expect(within(region).getAllByRole('heading').length).toBeGreaterThan(0)

		await user.click(toggle)

		// The panel stays while it collapses and is removed when that ends. There is no user action for the end of a
		// transition, so the test sends the event itself.
		expect(toggle).toHaveAttribute('aria-expanded', 'false')
		expect(screen.getByRole('region', { name: 'Skip links' })).toBeInTheDocument()
		fireEvent.transitionEnd(region)
		expect(screen.queryByRole('region', { name: 'Skip links' })).not.toBeInTheDocument()
	})

	it('removes a closed bite at once when the visitor prefers reduced motion', async () => {
		const user = userEvent.setup()
		const matchMedia = window.matchMedia
		vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ ...matchMedia(query), matches: true }))
		render(<A11yBites />)

		const toggle = screen.getByRole('button', { name: 'Skip links' })
		await user.click(toggle)
		await user.click(toggle)

		expect(screen.queryByRole('region', { name: 'Skip links' })).not.toBeInTheDocument()

		vi.restoreAllMocks()
	})

	it('does not close an open bite on a click in its content', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		const toggle = screen.getByRole('button', { name: 'Use of color' })
		await user.click(toggle)
		const region = screen.getByRole('region', { name: 'Use of color' })

		await user.click(within(region).getAllByRole('heading')[0])
		await user.dblClick(within(region).getAllByRole('paragraph')[0])

		expect(toggle).toHaveAttribute('aria-expanded', 'true')
	})

	it('closes a bite with the close button at the end of its content and puts focus back on its title', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		const toggle = screen.getByRole('button', { name: 'Use of color' })
		await user.click(toggle)
		const region = screen.getByRole('region', { name: 'Use of color' })

		await user.click(within(region).getByRole('button', { name: 'Close Use of color' }))

		expect(toggle).toHaveAttribute('aria-expanded', 'false')
		expect(toggle).toHaveFocus()
	})

	it('closes a bite on Escape from inside its content and puts focus back on its title', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		const toggle = screen.getByRole('button', { name: 'Use of color' })
		await user.click(toggle)
		const region = screen.getByRole('region', { name: 'Use of color' })

		await user.click(within(region).getAllByRole('link')[0])
		within(region).getAllByRole('link')[0].focus()
		await user.keyboard('{Escape}')

		expect(toggle).toHaveAttribute('aria-expanded', 'false')
		expect(toggle).toHaveFocus()
	})

	it('closes a bite on Escape while focus is still on its title or on the page after a click on its text', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		const toggle = screen.getByRole('button', { name: 'Use of color' })
		await user.click(toggle)
		await user.keyboard('{Escape}')
		expect(toggle).toHaveAttribute('aria-expanded', 'false')

		await user.click(toggle)
		await user.click(within(screen.getByRole('region', { name: 'Use of color' })).getAllByRole('heading')[0])
		await user.keyboard('{Escape}')
		expect(toggle).toHaveAttribute('aria-expanded', 'false')
	})

	it('links the sections of an open bite from its contents, each to its own heading', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		expect(screen.queryByRole('navigation', { name: 'Skip links contents' })).not.toBeInTheDocument()

		await user.click(screen.getByRole('button', { name: 'Skip links' }))
		const contents = screen.getByRole('navigation', { name: 'Skip links contents' })
		const links = within(contents).getAllByRole('link')

		expect(links.length).toBeGreaterThan(0)
		links.forEach((link) => {
			const id = link.getAttribute('href')?.slice(1)
			expect(id).toMatch(/^bite-\d+-section-\d+$/)
			expect(document.getElementById(id ?? '')).toHaveTextContent(link.textContent ?? '')
		})
	})

	it('keeps only one bite open at a time', async () => {
		const user = userEvent.setup()
		render(<A11yBites />)

		await user.click(screen.getByRole('button', { name: 'Skip links' }))
		await user.click(screen.getByRole('button', { name: 'Focus indicators' }))

		expect(screen.getByRole('button', { name: 'Skip links' })).toHaveAttribute('aria-expanded', 'false')
		expect(screen.getByRole('button', { name: 'Focus indicators' })).toHaveAttribute('aria-expanded', 'true')
	})

	it('lists the resources in two groups, opening each link in a new tab', () => {
		render(<A11yBites />)

		const resources = screen.getByRole('region', { name: 'Resources' })
		const blogs = within(resources).getByRole('list', { name: 'Blogs' })
		const docs = within(resources).getByRole('list', { name: 'Documentation for building' })

		expect(within(blogs).getAllByRole('link')).toHaveLength(3)
		expect(within(docs).getAllByRole('link')).toHaveLength(3)

		const link = within(blogs).getByRole('link', { name: /^Adrian Roselli\s*\(opens in a new tab\)$/ })
		expect(link).toHaveAttribute('href', 'https://adrianroselli.com/tag/accessibility')
		expect(link).toHaveAttribute('target', '_blank')
	})

	it('scrolls the title into view on open only when it is outside the viewport', async () => {
		const user = userEvent.setup()
		const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView')
		const rect = vi.spyOn(Element.prototype, 'getBoundingClientRect')
		render(<A11yBites />)

		rect.mockReturnValue(new DOMRect(0, 100, 100, 40))
		await user.click(screen.getByRole('button', { name: 'Skip links' }))
		expect(scrollIntoView).not.toHaveBeenCalled()

		rect.mockReturnValue(new DOMRect(0, -200, 100, 40))
		await user.click(screen.getByRole('button', { name: 'Focus indicators' }))
		expect(scrollIntoView).toHaveBeenCalledTimes(1)

		vi.restoreAllMocks()
	})
})
