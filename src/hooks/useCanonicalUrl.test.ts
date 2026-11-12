import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useCanonicalUrl } from './useCanonicalUrl'

const canonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
const ogUrl = () => document.head.querySelector('meta[property="og:url"]')?.getAttribute('content')

describe('useCanonicalUrl', () => {
	it('points the canonical link and og:url at the page, and removes them when the page is left', () => {
		const { unmount } = renderHook(() => useCanonicalUrl('/about'))

		expect(canonical()).toBe('https://kristinapihl.pages.dev/about')
		expect(ogUrl()).toBe('https://kristinapihl.pages.dev/about')

		unmount()

		expect(canonical()).toBeUndefined()
		expect(ogUrl()).toBeUndefined()
	})

	it('follows a path that changes, keeping a single tag of each', () => {
		const { rerender } = renderHook(({ path }) => useCanonicalUrl(path), { initialProps: { path: '/about' } })

		rerender({ path: '/boardgames' })

		expect(canonical()).toBe('https://kristinapihl.pages.dev/boardgames')
		expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
	})
})
