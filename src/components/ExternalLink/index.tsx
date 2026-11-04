import type { ReactNode } from 'react'
import { FiExternalLink } from 'react-icons/fi'

import styles from './index.module.css'

type ExternalLinkProps = {
	href: string
	className?: string
	children: ReactNode
}

// A link that opens in a new tab: an icon shows it, and screen readers hear it at the end of the link's name.
export const ExternalLink = ({ href, className, children }: ExternalLinkProps) => {
	// For text links, the last word and the icon are kept in one piece that doesn't wrap, so the icon never ends up on a
	// line of its own.
	const text = typeof children === 'string' ? children : null
	const breakAt = text ? text.lastIndexOf(' ') + 1 : 0

	return (
		<a className={className} href={href} target="_blank" rel="noopener noreferrer">
			{text ? text.slice(0, breakAt) : children}
			<span className={styles.end}>
				{text?.slice(breakAt)}
				<FiExternalLink className={styles.icon} aria-hidden="true" focusable="false" />
			</span>
			<span className="visually-hidden"> (opens in a new tab)</span>
		</a>
	)
}
