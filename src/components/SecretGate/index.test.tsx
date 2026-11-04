import { render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SecretGate } from '.'

const Location = () => {
	const { search } = useLocation()
	return <p data-testid="search">{search}</p>
}

const renderGate = (path: string) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<SecretGate fallback={<p>Locked</p>}>
				<p>Secret content</p>
			</SecretGate>
			<Location />
		</MemoryRouter>
	)

describe('SecretGate', () => {
	beforeEach(() => {
		vi.stubEnv('VITE_SECRET_KEY', 'open-sesame')
	})

	afterEach(() => {
		vi.unstubAllEnvs()
		localStorage.clear()
	})

	it('unlocks with the key, remembers it and removes it from the address', () => {
		const { unmount } = renderGate('/books?key=open-sesame&sort=new')

		expect(screen.getByText('Secret content')).toBeInTheDocument()
		expect(screen.getByTestId('search')).toHaveTextContent(/^\?sort=new$/)

		unmount()
		renderGate('/books')

		expect(screen.getByText('Secret content')).toBeInTheDocument()
	})

	it('shows the fallback without a key or with a wrong one', () => {
		const { unmount } = renderGate('/books')
		expect(screen.getByText('Locked')).toBeInTheDocument()

		unmount()
		renderGate('/books?key=guess')
		expect(screen.getByText('Locked')).toBeInTheDocument()
		expect(screen.queryByText('Secret content')).not.toBeInTheDocument()
	})

	it('locks a browser out again once the key changes', () => {
		localStorage.setItem('secret-key', 'old-key')
		renderGate('/books')

		expect(screen.getByText('Locked')).toBeInTheDocument()
	})

	it('stays locked for everyone when no key is set', () => {
		vi.stubEnv('VITE_SECRET_KEY', '')
		renderGate('/books?key=')

		expect(screen.getByText('Locked')).toBeInTheDocument()
	})
})
