import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HEADER_HEADING_ID, PageHeading } from '.'

describe('PageHeading', () => {
	it('is the page heading, with a copy in the header bar that screen readers skip', () => {
		render(
			<>
				<header>
					<div id={HEADER_HEADING_ID} />
				</header>
				<main>
					<PageHeading className="title">About</PageHeading>
				</main>
			</>
		)

		expect(screen.getAllByRole('heading')).toHaveLength(1)
		expect(screen.getByRole('heading', { level: 1, name: 'About' })).toHaveClass('title')

		const copy = document.getElementById(HEADER_HEADING_ID)?.firstElementChild
		expect(copy).toHaveTextContent('About')
		expect(copy).toHaveAttribute('aria-hidden', 'true')
	})

	it('measures where the copy moves from once it is in the header bar', () => {
		render(
			<>
				<header>
					<div id={HEADER_HEADING_ID} />
				</header>
				<PageHeading className="title">About</PageHeading>
			</>
		)

		const copy = document.getElementById(HEADER_HEADING_ID)?.firstElementChild
		expect(copy).toHaveAttribute('data-measured')
		expect(screen.getByRole('heading', { name: 'About' })).toHaveAttribute('data-measured')
	})

	it('is just the heading on a page without the header bar', () => {
		const { container } = render(<PageHeading className="title">About</PageHeading>)

		expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
		expect(container.querySelector('[aria-hidden]')).toBeNull()
	})
})
