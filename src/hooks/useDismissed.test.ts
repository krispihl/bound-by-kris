import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDismissed } from './useDismissed'

afterEach(() => {
	localStorage.clear()
	vi.restoreAllMocks()
})

describe('useDismissed', () => {
	it('is not dismissed until dismiss is called, and then remembers it', () => {
		const { result } = renderHook(() => useDismissed('thing-dismissed'))

		expect(result.current.isDismissed).toBe(false)
		act(() => result.current.dismiss())
		expect(result.current.isDismissed).toBe(true)
		expect(localStorage.getItem('thing-dismissed')).toBe('true')
	})

	it('starts dismissed when it was dismissed before', () => {
		localStorage.setItem('thing-dismissed', 'true')
		const { result } = renderHook(() => useDismissed('thing-dismissed'))

		expect(result.current.isDismissed).toBe(true)
	})

	it('still dismisses when the browser blocks storage', () => {
		vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
			throw new Error('blocked')
		})
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('blocked')
		})
		const { result } = renderHook(() => useDismissed('thing-dismissed'))

		expect(result.current.isDismissed).toBe(false)
		act(() => result.current.dismiss())
		expect(result.current.isDismissed).toBe(true)
	})
})
