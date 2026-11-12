import { Fragment } from 'react'

// Words a screen reader gets wrong, and how it should say them: an acronym spelled letter by letter, "A/B" without the
// slash, or "bikepacking" as two words.
const SPOKEN: Record<string, string> = {
	SEO: 'S E O',
	'A/B': 'A B',
	bikepacking: 'bike packing',
}

const PATTERN = new RegExp(`\\b(${Object.keys(SPOKEN).join('|')})\\b`)

// Shows the text as it is, but a screen reader hears each of these abbreviations as given in SPOKEN.
export const SpokenAcronyms = ({ text }: { text: string }) => (
	<>
		{text.split(PATTERN).map((part, index) =>
			index % 2 === 1 ? (
				<Fragment key={index}>
					<span aria-hidden="true">{part}</span>
					<span className="screenreader-only">{SPOKEN[part]}</span>
				</Fragment>
			) : (
				part
			)
		)}
	</>
)
