import { useCallback, useState } from 'react'

const readDismissed = (key: string) => {
	try {
		return localStorage.getItem(key) === 'true'
	} catch {
		return false
	}
}

// Whether the visitor has dismissed something, remembered under the given key so it stays dismissed on every page and
// visit. Where the browser blocks storage, the dismissal still holds until the page is left.
export const useDismissed = (key: string) => {
	const [isDismissed, setIsDismissed] = useState(() => readDismissed(key))

	const dismiss = useCallback(() => {
		setIsDismissed(true)
		try {
			localStorage.setItem(key, 'true')
		} catch {
			// Not remembered, but still dismissed for now.
		}
	}, [key])

	return { isDismissed, dismiss }
}
