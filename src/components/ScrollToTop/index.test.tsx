import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ScrollToTop } from '.'

const renderAt = (path: string) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<ScrollToTop />
			<Link to="/">Home</Link>
			<Link to="/boardgames">Board games</Link>
			<Link to="/boardgames#letter-A">Letter A</Link>
			<main>
				<Routes>
					<Route path="/" element={<h1>Home page</h1>} />
					<Route path="/boardgames" element={<h1>Board games page</h1>} />
				</Routes>
			</main>
		</MemoryRouter>
	)

afterEach(() => {
	vi.restoreAllMocks()
})

describe('ScrollToTop', () => {
	it('scrolls to the top when navigating to another page', async () => {
		const user = userEvent.setup()
		const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
		renderAt('/boardgames')
		scrollTo.mockClear()

		await user.click(screen.getByRole('link', { name: 'Home' }))

		expect(screen.getByText('Home page')).toBeInTheDocument()
		expect(scrollTo).toHaveBeenCalledWith(0, 0)
	})

	it('leaves the scroll alone for a link within the same page', async () => {
		const user = userEvent.setup()
		const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
		renderAt('/boardgames')
		scrollTo.mockClear()

		await user.click(screen.getByRole('link', { name: 'Letter A' }))

		expect(scrollTo).not.toHaveBeenCalled()
	})

	it('moves focus to the new page heading when navigating to another page', async () => {
		const user = userEvent.setup()
		vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
		renderAt('/boardgames')

		await user.click(screen.getByRole('link', { name: 'Home' }))

		expect(screen.getByRole('heading', { level: 1, name: 'Home page' })).toHaveFocus()
	})

	it('leaves focus alone on the first page load', () => {
		vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
		renderAt('/boardgames')

		expect(screen.getByRole('heading', { level: 1, name: 'Board games page' })).not.toHaveFocus()
	})
})
