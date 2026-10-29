import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { useEscapeKey } from './useEscapeKey'

describe('useEscapeKey', () => {
  it('calls the handler when Escape is pressed while active', async () => {
    const onEscape = vi.fn()
    renderHook(() => useEscapeKey(true, onEscape))

    await userEvent.setup().keyboard('{Escape}')

    expect(onEscape).toHaveBeenCalledTimes(1)
  })

  it('ignores other keys', async () => {
    const onEscape = vi.fn()
    renderHook(() => useEscapeKey(true, onEscape))

    await userEvent.setup().keyboard('a')

    expect(onEscape).not.toHaveBeenCalled()
  })

  it('does nothing while inactive', async () => {
    const onEscape = vi.fn()
    renderHook(() => useEscapeKey(false, onEscape))

    await userEvent.setup().keyboard('{Escape}')

    expect(onEscape).not.toHaveBeenCalled()
  })

  it('stops listening after unmount', async () => {
    const onEscape = vi.fn()
    const { unmount } = renderHook(() => useEscapeKey(true, onEscape))
    unmount()

    await userEvent.setup().keyboard('{Escape}')

    expect(onEscape).not.toHaveBeenCalled()
  })
})
