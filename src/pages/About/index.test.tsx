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

// The sections are plain <section>s, with no landmark of their own, so each is found by its heading.
const getSection = (heading: string) => {
	const section = screen.getByRole('heading', { level: 2, name: heading }).closest('section')
	if (!section) throw new Error(`No section for ${heading}`)

	return section
}

describe('About', () => {
	it('renders the page heading and a section with a heading for each part of the CV', () => {
		renderAbout()

		expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
		CV_SECTIONS.forEach((section) => {
			expect(getSection(section.heading)).toBeInTheDocument()
		})
	})

	it('does not make every section a landmark', () => {
		renderAbout()

		expect(screen.queryAllByRole('region')).toHaveLength(0)
	})

	it('says which role in the timeline is the current one', () => {
		renderAbout()

		// Only one step is marked, and the mark is inside that step's own list item.
		const marker = within(getSection('Work')).getByText(/\(current role\)/)
		expect(marker.closest('li')).toHaveTextContent(/Software Engineer\s*\(current role\)/)
	})

	it('lists the work entries with their periods', () => {
		renderAbout()

		const work = getSection('Work')
		expect(within(work).getByRole('heading', { level: 3, name: 'Pipedrive' })).toBeInTheDocument()
		expect(within(work).getByText('2018 – 2026')).toBeInTheDocument()
	})

	it('lists the highlights of each Pipedrive role', () => {
		renderAbout()

		const work = getSection('Work')
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

		const interests = getSection('Interests')
		expect(within(interests).getByRole('link', { name: 'board games' })).toHaveAttribute('href', '/boardgames')
		expect(interests).toHaveTextContent('Cycling, bikepacking, motorcycle touring, snowboarding, running, swimming, reading, board games')
	})

	it('links to the LinkedIn recommendations from the profile, opening them in a new tab', () => {
		renderAbout()

		const profile = getSection('Profile')
		const link = within(profile).getByRole('link', { name: /^LinkedIn recommendations\s*\(opens in a new tab\)$/ })
		expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/kristina-pihl-97461a10a/details/recommendations/')
		expect(link).toHaveAttribute('target', '_blank')
	})
})
