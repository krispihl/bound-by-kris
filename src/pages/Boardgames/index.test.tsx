import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Boardgames } from '.'

const CSV = 'GAME,PLAYERS,LANGUAGE,NOTES\nAzul,2 - 4,,\nAlias,4 - 12,EST,\n7 wonders leaders,Expansion,,'

const mockFetch = (...responses: Response[]) => {
	const fetchMock = vi.fn<typeof fetch>()
	responses.forEach((response) => fetchMock.mockResolvedValueOnce(response))
	vi.stubGlobal('fetch', fetchMock)
}

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('Boardgames', () => {
	it('shows a loading status, then a section for every game in the sheet', async () => {
		mockFetch(new Response(CSV))
		render(<Boardgames />)

		expect(screen.getByRole('heading', { level: 1, name: 'Boardgames' })).toBeInTheDocument()
		expect(screen.getByRole('status')).toHaveTextContent('Loading the games')

		expect(await screen.findAllByRole('article')).toHaveLength(3)
		expect(screen.getByText('3 games on my shelf')).toBeInTheDocument()
		expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual(['#', 'A'])
		expect(screen.queryByRole('status')).not.toBeInTheDocument()
	})

	it('shows player counts, and tags expansions and Estonian editions', async () => {
		mockFetch(new Response(CSV))
		render(<Boardgames />)

		const alias = (await screen.findByRole('heading', { name: 'Alias' })).closest('article')
		expect(alias).toHaveTextContent('4–12 players')
		expect(alias).toHaveTextContent('Estonian')

		const leaders = screen.getByRole('heading', { name: '7 wonders leaders' }).closest('article')
		expect(leaders).toHaveTextContent('Expansion')
		expect(leaders).not.toHaveTextContent('players')
	})

	it('shows an error with a retry that loads the games', async () => {
		const user = userEvent.setup()
		mockFetch(new Response('', { status: 500 }), new Response(CSV))
		render(<Boardgames />)

		expect(await screen.findByRole('alert')).toHaveTextContent('The games list didn’t load.')
		await user.click(screen.getByRole('button', { name: 'Try again' }))

		expect(await screen.findAllByRole('article')).toHaveLength(3)
		expect(screen.queryByRole('alert')).not.toBeInTheDocument()
	})
})
