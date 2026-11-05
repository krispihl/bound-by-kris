import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { usePageTitle } from './usePageTitle'

describe('usePageTitle', () => {
	it('puts the page title before the site name', () => {
		renderHook(() => usePageTitle('About'))

		expect(document.title).toBe('About – Kristina Pihl')
	})

	it('uses the site name alone without a title', () => {
		renderHook(() => usePageTitle())

		expect(document.title).toBe('Kristina Pihl')
	})

	it('follows a title that changes', () => {
		const { rerender } = renderHook(({ title }) => usePageTitle(title), { initialProps: { title: 'About' } })

		rerender({ title: 'Board games' })

		expect(document.title).toBe('Board games – Kristina Pihl')
	})
})
