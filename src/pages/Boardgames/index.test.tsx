import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BOARDGAMES } from '../../data/boardgames'

import { Boardgames } from '.'

describe('Boardgames', () => {
  it('renders the page heading and a section for every game', () => {
    render(<Boardgames />)

    expect(screen.getByRole('heading', { level: 1, name: 'Boardgames' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(BOARDGAMES.length)
  })
})
