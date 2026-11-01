import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SocialLinks } from '.'

describe('SocialLinks', () => {
  it('links to the GitHub and LinkedIn profiles, opening in a new tab', () => {
    render(<SocialLinks />)

    const github = screen.getByRole('link', { name: 'GitHub (opens in a new tab)' })
    expect(github).toHaveAttribute('href', 'https://github.com/kristinapihl')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'))

    expect(screen.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/kristina-pihl-97461a10a/'
    )
  })
})
