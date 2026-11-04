import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CV_SECTIONS } from '../../data/cv'

import { About } from '.'

describe('About', () => {
	it('renders the page heading and a labelled section for each part of the CV', () => {
		render(<About />)

		expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
		CV_SECTIONS.forEach((section) => {
			expect(screen.getByRole('region', { name: section.heading })).toBeInTheDocument()
		})
	})

	it('lists the work entries with their periods', () => {
		render(<About />)

		const work = screen.getByRole('region', { name: 'Work' })
		expect(within(work).getByRole('heading', { level: 3, name: 'Pipedrive' })).toBeInTheDocument()
		expect(within(work).getByText('2018 – 2026')).toBeInTheDocument()
	})

	it('lists the highlights of each Pipedrive role', () => {
		render(<About />)

		const work = screen.getByRole('region', { name: 'Work' })
		expect(within(work).getByRole('heading', { level: 4, name: 'Accessibility Mission Lead & Engineer' })).toBeInTheDocument()
		expect(within(work).getByRole('heading', { level: 4, name: 'Design System' })).toBeInTheDocument()
	})

	it('links to the PDF CV, opening it in a new tab', () => {
		render(<About />)

		const link = screen.getByRole('link', { name: /^Printable CV \(PDF\)\s*\(opens in a new tab\)$/ })
		expect(link).toHaveAttribute('href', '/kristina-pihl-cv.pdf')
		expect(link).toHaveAttribute('target', '_blank')
	})

	it('does not leave drafting notes on the page', () => {
		render(<About />)

		expect(screen.queryByText(/\[Add|confirm/i)).not.toBeInTheDocument()
	})

	it('does not publish contact details from the CV', () => {
		render(<About />)

		expect(screen.queryByText(/@gmail|\+372|1985/)).not.toBeInTheDocument()
	})
})
