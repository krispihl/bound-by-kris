import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { clearBoardgamesCache, useBoardgames } from './useBoardgames'

const CSV = 'GAME,PLAYERS,LANGUAGE\nAzul,2 - 4,\nAlias,4 - 12,EST'

const mockFetch = (...responses: Response[]) => {
	const fetchMock = vi.fn<typeof fetch>()
	responses.forEach((response) => fetchMock.mockResolvedValueOnce(response))
	vi.stubGlobal('fetch', fetchMock)
	return fetchMock
}

afterEach(() => {
	vi.unstubAllGlobals()
	clearBoardgamesCache()
})

describe('useBoardgames', () => {
	it('starts loading, then holds the games from the sheet', async () => {
		mockFetch(new Response(CSV))
		const { result } = renderHook(() => useBoardgames())

		expect(result.current.state).toEqual({ status: 'loading' })
		await waitFor(() => expect(result.current.state.status).toBe('success'))
		expect(result.current.state).toEqual({
			status: 'success',
			games: [
				{ title: 'Alias', players: '4 – 12 players', isExpansion: false, isEstonian: true },
				{ title: 'Azul', players: '2 – 4 players', isExpansion: false, isEstonian: false },
			],
		})
	})

	it('ends in the error state on a failed response or a sheet without games', async () => {
		mockFetch(new Response('', { status: 500 }))
		const failed = renderHook(() => useBoardgames())
		await waitFor(() => expect(failed.result.current.state.status).toBe('error'))

		mockFetch(new Response('NAME\nAzul'))
		const empty = renderHook(() => useBoardgames())
		await waitFor(() => expect(empty.result.current.state.status).toBe('error'))
	})

	it('loads again on retry', async () => {
		const fetchMock = mockFetch(new Response('', { status: 500 }), new Response(CSV))
		const { result } = renderHook(() => useBoardgames())
		await waitFor(() => expect(result.current.state.status).toBe('error'))

		act(() => result.current.retry())

		expect(result.current.state).toEqual({ status: 'loading' })
		await waitFor(() => expect(result.current.state.status).toBe('success'))
		expect(fetchMock).toHaveBeenCalledTimes(2)
	})

	it('reuses the loaded games on the next mount without fetching again', async () => {
		const fetchMock = mockFetch(new Response(CSV))
		const first = renderHook(() => useBoardgames())
		await waitFor(() => expect(first.result.current.state.status).toBe('success'))
		first.unmount()

		const second = renderHook(() => useBoardgames())

		expect(second.result.current.state).toEqual(first.result.current.state)
		expect(fetchMock).toHaveBeenCalledTimes(1)
	})

	it('fetches again on the next mount after a failed load', async () => {
		const fetchMock = mockFetch(new Response('', { status: 500 }), new Response(CSV))
		const first = renderHook(() => useBoardgames())
		await waitFor(() => expect(first.result.current.state.status).toBe('error'))
		first.unmount()

		const second = renderHook(() => useBoardgames())

		expect(second.result.current.state).toEqual({ status: 'loading' })
		await waitFor(() => expect(second.result.current.state.status).toBe('success'))
		expect(fetchMock).toHaveBeenCalledTimes(2)
	})
})
