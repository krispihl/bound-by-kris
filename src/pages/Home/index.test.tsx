import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Home } from '.'

describe('Home', () => {
  it('shows the full name as the page heading and an introduction', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 1, name: 'Kristina Pihl' })).toBeInTheDocument()
    expect(screen.getByText(/Frontend developer passionate about accessibility/)).toBeInTheDocument()
  })

  it('links to the social profiles', () => {
    render(<Home />)

    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
  })
})
