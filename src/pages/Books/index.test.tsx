import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { BOOKS } from '../../data/books'

import { Books } from '.'

describe('Books', () => {
  it('lists every book as a closed native disclosure with its title and author', () => {
    render(<Books />)

    expect(screen.getByRole('heading', { level: 1, name: 'Books' })).toBeInTheDocument()
    expect(screen.getAllByRole('group')).toHaveLength(BOOKS.length)
    expect(screen.getByText('By James Clear')).toBeInTheDocument()
    expect(screen.getByText(/Atomic Habits/).closest('details')).not.toHaveAttribute('open')
  })

  it('opens a book on activation to reveal its review', async () => {
    const user = userEvent.setup()
    render(<Books />)

    const summary = screen.getByText(/Atomic Habits/)
    await user.click(summary)

    expect(summary.closest('details')).toHaveAttribute('open')
    expect(screen.getByText(/I have now read this book three times/)).toBeVisible()
  })

  it('closes an open book when its content is clicked', async () => {
    const user = userEvent.setup()
    render(<Books />)

    const summary = screen.getByText(/Atomic Habits/)
    await user.click(summary)
    await user.click(screen.getByText(/I have now read this book three times/))

    expect(summary.closest('details')).not.toHaveAttribute('open')
  })
})
