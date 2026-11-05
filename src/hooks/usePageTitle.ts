import { useEffect } from 'react'

const SITE_NAME = 'Kristina Pihl'

// Names the page in the tab, the history and what a screen reader says first on arriving: "About – Kristina Pihl", or
// just the site name when no title is given (the homepage).
export const usePageTitle = (title?: string) => {
	useEffect(() => {
		document.title = title ? `${title} – ${SITE_NAME}` : SITE_NAME
	}, [title])
}
