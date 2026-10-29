import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { Navbar } from '.'

const renderNavbar = () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )

  return userEvent.setup()
}

describe('Navbar', () => {
  it('starts closed and opens when the toggle is pressed', async () => {
    const user = renderNavbar()
    const toggle = screen.getByRole('button', { name: 'Menu' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes on Escape', async () => {
    const user = renderNavbar()
    await user.click(screen.getByRole('button', { name: 'Menu' }))

    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes when a link is clicked', async () => {
    const user = renderNavbar()
    await user.click(screen.getByRole('button', { name: 'Menu' }))

    await user.click(screen.getByRole('link', { name: 'Books' }))

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('marks the current page link as active', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Books' })).not.toHaveAttribute('aria-current')
  })
})
