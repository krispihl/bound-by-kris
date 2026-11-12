import type { ReactNode } from 'react'

import { SpokenAcronyms } from '../SpokenAcronyms'

import styles from './index.module.css'

const INLINE_PATTERN = /(`[^`]+`|\*\*[^*].*?\*\*|\*[^*\s](?:[^*]*[^*\s])?\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|\{[^{}|]+\|[^{}|]+\})/
const LINK_PATTERN = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/

// A lone opening tag such as <nav>, which a screen reader would read as "less than nav greater than".
const TAG_PATTERN = /^<([a-z][a-z0-9]*)>$/i
const LABELLED_PATTERN = /^\{([^{}|]+)\|([^{}|]+)\}$/
// A run of emoji, including skin tones, variation selectors and joined sequences like 😮‍💨. ©, ® and ™ are excluded as they are text.
const EMOJI_PATTERN =
	/((?:(?![\u00A9\u00AE\u2122])\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*)+)/u

const parseInline = (text: string): ReactNode[] =>
	text.split(INLINE_PATTERN).map((part, index) => {
		if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
			const code = part.slice(1, -1)
			const tag = TAG_PATTERN.exec(code)
			// The brackets are for the eye; a screen reader is told the element instead. Longer snippets stay as written.
			return tag ? (
				<code key={index}>
					<span aria-hidden="true">{code}</span>
					<span className="screenreader-only">{tag[1]} element</span>
				</code>
			) : (
				<code key={index}>{code}</code>
			)
		}
		if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
			return <strong key={index}>{parseInline(part.slice(2, -2))}</strong>
		}
		if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
			return <em key={index}>{parseInline(part.slice(1, -1))}</em>
		}
		const labelled = LABELLED_PATTERN.exec(part)
		if (labelled) {
			return (
				<span key={index} role="img" aria-label={labelled[2]}>
					{labelled[1]}
				</span>
			)
		}
		const link = LINK_PATTERN.exec(part)
		if (link) {
			return (
				<a key={index} href={link[2]} className={styles.link} target="_blank" rel="noreferrer">
					{link[1]}
					<span className="screenreader-only"> (opens in a new tab)</span>
				</a>
			)
		}
		// A newline in the text starts a new line.
		const lines = part.split('\n')
		return lines.flatMap((line, lineIndex) => {
			// An emoji without a label is decoration: the words around it carry the meaning, so it is hidden from screen readers.
			const pieces = line.split(EMOJI_PATTERN).map((piece, pieceIndex) =>
				pieceIndex % 2 === 1 ? (
					<span key={`${index}-${lineIndex}-${pieceIndex}`} aria-hidden="true">
						{piece}
					</span>
				) : (
					<SpokenAcronyms key={`${index}-${lineIndex}-${pieceIndex}`} text={piece} />
				)
			)
			return lineIndex === 0 ? pieces : [<br key={`${index}-${lineIndex}`} />, ...pieces]
		})
	})

// Renders the small markdown subset used in bite content (code, bold, italic, links, line breaks). A bare emoji is hidden from screen readers; {🙂|smiling face} gives one a label, as `role="img"` with `aria-label` as React nodes.
export const RichText = ({ text }: { text: string }) => <>{parseInline(text)}</>
