import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { A11Y_BITES } from '../../data/a11yBites'

import { A11yBites } from '.'

describe('A11yBites', () => {
  it('renders a collapsed toggle for every bite under a page heading', () => {
    render(<A11yBites />)

    expect(screen.getByRole('heading', { level: 1, name: 'a11y bites' })).toBeInTheDocument()

    const toggles = screen.getAllByRole('button')
    expect(toggles).toHaveLength(A11Y_BITES.length)
    toggles.forEach((toggle) => expect(toggle).toHaveAttribute('aria-expanded', 'false'))
  })

  it('expands a bite on click and collapses it on a second click', async () => {
    const user = userEvent.setup()
    render(<A11yBites />)

    const toggle = screen.getByRole('button', { name: 'Skip links' })
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const region = screen.getByRole('region', { name: 'Skip links' })
    expect(within(region).getAllByRole('heading').length).toBeGreaterThan(0)

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region', { name: 'Skip links' })).not.toBeInTheDocument()
  })

  it('keeps only one bite open at a time', async () => {
    const user = userEvent.setup()
    render(<A11yBites />)

    await user.click(screen.getByRole('button', { name: 'Skip links' }))
    await user.click(screen.getByRole('button', { name: 'Focus indicators' }))

    expect(screen.getByRole('button', { name: 'Skip links' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Focus indicators' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('scrolls the title into view on open only when it is outside the viewport', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView')
    const rect = vi.spyOn(Element.prototype, 'getBoundingClientRect')
    render(<A11yBites />)

    rect.mockReturnValue(new DOMRect(0, 100, 100, 40))
    await user.click(screen.getByRole('button', { name: 'Skip links' }))
    expect(scrollIntoView).not.toHaveBeenCalled()

    rect.mockReturnValue(new DOMRect(0, -200, 100, 40))
    await user.click(screen.getByRole('button', { name: 'Focus indicators' }))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)

    vi.restoreAllMocks()
  })
})
