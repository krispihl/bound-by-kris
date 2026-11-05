import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { MEDIA_QUERIES } from '../styles/breakpoints'
import { useBreakpoint } from './useBreakpoint'

// jsdom has no layout, so the window "is" whatever the listed queries say, and resizing is calling `resizeTo`.
let matching: string[] = []
const listeners = new Set<() => void>()

const fakeWindow = (queries: string[]) => {
	matching = queries
	vi.spyOn(window, 'matchMedia').mockImplementation(
		(query) =>
			({
				matches: matching.includes(query),
				media: query,
				addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
				removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
			}) as unknown as MediaQueryList
	)
}

const resizeTo = (queries: string[]) => {
	act(() => {
		matching = queries
		listeners.forEach((listener) => listener())
	})
}

const MOBILE = [MEDIA_QUERIES['mobile-only'], MEDIA_QUERIES['mobile-and-tablet']]
const TABLET = [MEDIA_QUERIES['tablet-only'], MEDIA_QUERIES['not-mobile'], MEDIA_QUERIES['mobile-and-tablet']]
const DESKTOP = [MEDIA_QUERIES['desktop-only'], MEDIA_QUERIES['not-mobile']]

afterEach(() => {
	vi.restoreAllMocks()
	listeners.clear()
})

describe('useBreakpoint', () => {
	it('says the window is a desktop one when it is wide', () => {
		fakeWindow(DESKTOP)
		const { result } = renderHook(() => useBreakpoint())

		expect(result.current).toEqual({
			device: 'desktop',
			isMobile: false,
			isTablet: false,
			isDesktop: true,
			isMobileOrTablet: false,
		})
	})

	it('says mobile on a narrow window', () => {
		fakeWindow(MOBILE)
		const { result } = renderHook(() => useBreakpoint())

		expect(result.current.device).toBe('mobile')
		expect(result.current.isMobileOrTablet).toBe(true)
	})

	it('says tablet between the two breakpoints', () => {
		fakeWindow(TABLET)
		const { result } = renderHook(() => useBreakpoint())

		expect(result.current.device).toBe('tablet')
		expect(result.current.isMobileOrTablet).toBe(true)
	})

	it('updates when the window is resized across a breakpoint', () => {
		fakeWindow(DESKTOP)
		const { result } = renderHook(() => useBreakpoint())

		resizeTo(MOBILE)
		expect(result.current.isMobile).toBe(true)
	})
})
