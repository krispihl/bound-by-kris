import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useScrollLock } from './useScrollLock'

describe('useScrollLock', () => {
  it('hides body overflow while locked and restores it afterwards', () => {
    document.body.style.overflow = 'auto'
    const { rerender } = renderHook(({ isLocked }) => useScrollLock(isLocked), { initialProps: { isLocked: true } })

    expect(document.body.style.overflow).toBe('hidden')

    rerender({ isLocked: false })

    expect(document.body.style.overflow).toBe('auto')
  })

  it('leaves body overflow alone while unlocked', () => {
    document.body.style.overflow = 'scroll'
    renderHook(() => useScrollLock(false))

    expect(document.body.style.overflow).toBe('scroll')
  })
})
