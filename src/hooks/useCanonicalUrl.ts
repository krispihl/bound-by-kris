import { useEffect } from 'react'

const SITE_URL = 'https://kristinapihl.pages.dev'

// Tells search engines and link previews which address is this page's own, e.g. '/about'. The tags are added while the
// page is shown and removed when it is left, so a page that doesn't call this (the 404) is left without them.
export const useCanonicalUrl = (path: string) => {
	useEffect(() => {
		const url = `${SITE_URL}${path}`

		const canonical = document.createElement('link')
		canonical.rel = 'canonical'
		canonical.href = url

		const ogUrl = document.createElement('meta')
		ogUrl.setAttribute('property', 'og:url')
		ogUrl.content = url

		document.head.append(canonical, ogUrl)

		return () => {
			canonical.remove()
			ogUrl.remove()
		}
	}, [path])
}
