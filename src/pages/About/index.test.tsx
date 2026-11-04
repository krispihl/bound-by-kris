import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { CV_SECTIONS } from '../../data/cv'

import { About } from '.'

const renderAbout = () =>
	render(
		<MemoryRouter>
			<About />
		</MemoryRouter>
	)

describe('About', () => {
	it('renders the page heading and a labelled section for each part of the CV', () => {
		renderAbout()

		expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
		CV_SECTIONS.forEach((section) => {
			expect(screen.getByRole('region', { name: section.heading })).toBeInTheDocument()
		})
	})

	it('lists the work entries with their periods', () => {
		renderAbout()

		const work = screen.getByRole('region', { name: 'Work' })
		expect(within(work).getByRole('heading', { level: 3, name: 'Pipedrive' })).toBeInTheDocument()
		expect(within(work).getByText('2018 – 2026')).toBeInTheDocument()
	})

	it('lists the highlights of each Pipedrive role', () => {
		renderAbout()

		const work = screen.getByRole('region', { name: 'Work' })
		expect(within(work).getByRole('heading', { level: 4, name: 'Accessibility Mission Lead & Engineer' })).toBeInTheDocument()
		expect(within(work).getByRole('heading', { level: 4, name: 'Design System' })).toBeInTheDocument()
	})

	it('links to the PDF CV, opening it in a new tab', () => {
		renderAbout()

		const link = screen.getByRole('link', { name: /^Printable CV \(PDF\)\s*\(opens in a new tab\)$/ })
		expect(link).toHaveAttribute('href', '/kristina-pihl-cv.pdf')
		expect(link).toHaveAttribute('target', '_blank')
	})

	it('does not leave drafting notes on the page', () => {
		renderAbout()

		expect(screen.queryByText(/\[Add|confirm/i)).not.toBeInTheDocument()
	})

	it('does not publish contact details from the CV', () => {
		renderAbout()

		expect(screen.queryByText(/@gmail|\+372|1985/)).not.toBeInTheDocument()
	})

	it('links board games in the interests to the board games page', () => {
		renderAbout()

		const interests = screen.getByRole('region', { name: 'Interests' })
		expect(within(interests).getByRole('link', { name: 'board games' })).toHaveAttribute('href', '/boardgames')
		expect(interests).toHaveTextContent('Cycling, bikepacking, motorcycle touring, snowboarding, running, swimming, reading, board games')
	})
})
