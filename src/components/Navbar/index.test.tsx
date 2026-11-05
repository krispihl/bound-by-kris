import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { Navbar } from '.'

const renderNavbar = () => {
	render(
		<MemoryRouter>
			<Navbar />
			<main>
				<a href="#behind">Link behind the menu</a>
			</main>
		</MemoryRouter>
	)

	return userEvent.setup()
}

describe('Navbar', () => {
	it('starts closed and opens when the toggle is pressed', async () => {
		const user = renderNavbar()
		const toggle = screen.getByRole('button', { name: 'Menu' })

		expect(toggle).toHaveAttribute('aria-expanded', 'false')

		await user.click(toggle)

		expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true')
	})

	it('closes on Escape', async () => {
		const user = renderNavbar()
		await user.click(screen.getByRole('button', { name: 'Menu' }))

		await user.keyboard('{Escape}')

		expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
	})

	it('moves focus back to the toggle when Escape is pressed on a menu link', async () => {
		const user = renderNavbar()
		await user.click(screen.getByRole('button', { name: 'Menu' }))
		screen.getByRole('link', { name: 'About' }).focus()

		await user.keyboard('{Escape}')

		expect(screen.getByRole('button', { name: 'Menu' })).toHaveFocus()
	})

	it('makes the page behind the open menu inert', async () => {
		const user = renderNavbar()
		const main = screen.getByRole('main')

		await user.click(screen.getByRole('button', { name: 'Menu' }))
		expect(main).toHaveAttribute('inert')

		await user.click(screen.getByRole('button', { name: 'Close' }))
		expect(main).not.toHaveAttribute('inert')
	})

	it('closes when a link is clicked', async () => {
		const user = renderNavbar()
		await user.click(screen.getByRole('button', { name: 'Menu' }))

		await user.click(screen.getByRole('link', { name: 'Board games' }))

		expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
	})

	it('marks the current page link as active', () => {
		renderNavbar()

		expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
		expect(screen.getByRole('link', { name: 'Board games' })).not.toHaveAttribute('aria-current')
	})
})
