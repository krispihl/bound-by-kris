import type { Block } from '../data/a11yBites'

export type BiteSection = {
	// Absent for the blocks before the first heading.
	// label is the bite and section number, e.g. "1.2" for the second section of bite 1.
	heading?: { id: string; label: string; text: string }
	// The "Common pitfalls" section, which is shown on its own card.
	isIssues: boolean
	blocks: Block[]
}

// The bite headings start with an emoji (🎯, ❓, 🚨, 💡); the page shows a number box instead.
const LEADING_EMOJI = /^\p{Extended_Pictographic}️?\s*/u

export const stripLeadingEmoji = (text: string) => text.replace(LEADING_EMOJI, '')

// Groups the blocks into sections, each starting at a top-level heading.
export const getBiteSections = (blocks: Block[], biteNumber: number): BiteSection[] => {
	const sections: BiteSection[] = []

	for (const block of blocks) {
		if (block.type === 'heading' && block.level === 2) {
			const text = stripLeadingEmoji(block.text)
			const number = sections.filter((section) => section.heading).length + 1
			sections.push({
				heading: { id: `bite-${biteNumber}-section-${number}`, label: `${biteNumber}.${number}`, text },
				isIssues: /common pitfalls/i.test(text),
				blocks: [],
			})
		} else {
			const current = sections.at(-1)
			if (current) {
				current.blocks.push(block)
			} else {
				sections.push({ isIssues: false, blocks: [block] })
			}
		}
	}

	return sections
}
