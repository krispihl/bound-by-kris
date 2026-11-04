import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useScrolledToBottom } from './useScrolledToBottom'

// jsdom does no layout, so the page height and scroll position are set by hand.
const setPage = ({ height, scrollY }: { height: number; scrollY: number }) => {
	Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: height })
	Object.defineProperty(window, 'scrollY', { configurable: true, value: scrollY })
}

const scrollTo = (scrollY: number) => {
	act(() => {
		Object.defineProperty(window, 'scrollY', { configurable: true, value: scrollY })
		window.dispatchEvent(new Event('scroll'))
	})
}

afterEach(() => {
	setPage({ height: 0, scrollY: 0 })
})

describe('useScrolledToBottom', () => {
	it('turns true once the page is scrolled to the end', () => {
		setPage({ height: window.innerHeight + 1000, scrollY: 0 })
		const { result } = renderHook(() => useScrolledToBottom())

		expect(result.current).toBe(false)
		scrollTo(1000)
		expect(result.current).toBe(true)
	})

	it('turns false again when scrolled back up', () => {
		setPage({ height: window.innerHeight + 1000, scrollY: 1000 })
		const { result } = renderHook(() => useScrolledToBottom())

		expect(result.current).toBe(true)
		scrollTo(500)
		expect(result.current).toBe(false)
	})

	it('counts a position a pixel short of the end as the bottom', () => {
		setPage({ height: window.innerHeight + 1000, scrollY: 0 })
		const { result } = renderHook(() => useScrolledToBottom())

		scrollTo(999)
		expect(result.current).toBe(true)
	})

	it('is true straight away on a page too short to scroll', () => {
		setPage({ height: window.innerHeight, scrollY: 0 })
		const { result } = renderHook(() => useScrolledToBottom())

		expect(result.current).toBe(true)
	})
})
