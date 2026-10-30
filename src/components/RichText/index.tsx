import type { ReactNode } from 'react'

import styles from './index.module.css'

const INLINE_PATTERN = /(`[^`]+`|\*\*[^*].*?\*\*|\*[^*\s](?:[^*]*[^*\s])?\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/
const LINK_PATTERN = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/

const parseInline = (text: string): ReactNode[] =>
  text.split(INLINE_PATTERN).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={index}>{part.slice(1, -1)}</code>
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={index}>{parseInline(part.slice(2, -2))}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={index}>{parseInline(part.slice(1, -1))}</em>
    }
    const link = LINK_PATTERN.exec(part)
    if (link) {
      return (
        <a key={index} href={link[2]} className={styles.link} target="_blank" rel="noreferrer">
          {link[1]}
          <span className={styles.visuallyHidden}> (opens in a new tab)</span>
        </a>
      )
    }
    return part
  })

// Renders the small markdown subset used in bite content (code, bold, italic, links) as React nodes.
export const RichText = ({ text }: { text: string }) => <>{parseInline(text)}</>
