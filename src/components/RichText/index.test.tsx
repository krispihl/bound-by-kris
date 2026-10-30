import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichText } from '.'

describe('RichText', () => {
  it('renders code, bold and italic spans', () => {
    render(<RichText text="Use `aria-label` on **buttons** and *links*" />)

    expect(screen.getByText('aria-label').tagName).toBe('CODE')
    expect(screen.getByText('buttons').tagName).toBe('STRONG')
    expect(screen.getByText('links').tagName).toBe('EM')
  })

  it('renders http links with their href', () => {
    render(<RichText text="See [WCAG](https://www.w3.org/WAI/WCAG21/)" />)

    expect(screen.getByRole('link', { name: /WCAG/ })).toHaveAttribute('href', 'https://www.w3.org/WAI/WCAG21/')
  })

  it('leaves unmatched markers and non-http links as plain text', () => {
    render(<RichText text="2 * 3 and [x](javascript:alert(1))" />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText(/2 \* 3/)).toBeInTheDocument()
  })
})
