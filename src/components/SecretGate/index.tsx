import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const STORAGE_KEY = 'secret-key'

const readStoredKey = () => {
	try {
		return localStorage.getItem(STORAGE_KEY)
	} catch {
		return null
	}
}

const storeKey = (key: string) => {
	try {
		localStorage.setItem(STORAGE_KEY, key)
		return true
	} catch {
		return false
	}
}

// Keeps a page from people who stumble upon its address: it shows the fallback unless the browser has once opened the
// page with ?key=<VITE_SECRET_KEY>, which is then remembered and removed from the address bar. Changing the key locks
// every browser out again. Not real security: the page's code still ships with the site.
export const SecretGate = ({ children, fallback }: { children: ReactNode; fallback: ReactNode }) => {
	const secret = import.meta.env.VITE_SECRET_KEY
	const [searchParams, setSearchParams] = useSearchParams()
	const givenKey = searchParams.get('key')
	const isUnlocked = Boolean(secret) && (givenKey === secret || readStoredKey() === secret)

	useEffect(() => {
		// Only removed once remembered, so a browser that blocks storage stays unlocked while the key is in the address.
		if (secret && givenKey === secret && storeKey(secret)) {
			setSearchParams(
				(params) => {
					params.delete('key')
					return params
				},
				{ replace: true }
			)
		}
	}, [secret, givenKey, setSearchParams])

	return isUnlocked ? children : fallback
}
