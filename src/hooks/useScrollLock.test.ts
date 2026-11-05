import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useScrollLock } from './useScrollLock'

describe('useScrollLock', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('hides body overflow while locked and restores it afterwards', () => {
		document.body.style.overflow = 'auto'
		const { rerender } = renderHook(({ isLocked }) => useScrollLock(isLocked), { initialProps: { isLocked: true } })

		expect(document.body.style.overflow).toBe('hidden')

		rerender({ isLocked: false })

		expect(document.body.style.overflow).toBe('auto')
	})

	it('pads the body by the scrollbar width it gives up and shares that width, then removes both', () => {
		vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280)
		vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1268)
		const { unmount } = renderHook(() => useScrollLock(true))

		expect(document.body.style.paddingRight).toBe('12px')
		expect(document.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('12px')

		unmount()

		expect(document.body.style.paddingRight).toBe('')
		expect(document.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('')
	})

	it('leaves body overflow alone while unlocked', () => {
		document.body.style.overflow = 'scroll'
		renderHook(() => useScrollLock(false))

		expect(document.body.style.overflow).toBe('scroll')
	})
})
