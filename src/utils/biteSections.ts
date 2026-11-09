import type { A11yBite, Block } from '../data/a11yBites'

export type BiteSection = {
	// label is the bite and section number, e.g. "1.2" for the second section of bite 1.
	heading: { id: string; label: string; text: string }
	// The "Common pitfalls" section, which is shown on its own card.
	isIssues: boolean
	blocks: Block[]
}

// Groups the blocks into sections, each starting at a top-level heading.
export const getBiteSections = (blocks: A11yBite['content'], biteNumber: number): BiteSection[] => {
	const sections: BiteSection[] = []

	for (const block of blocks) {
		if (block.type === 'heading' && block.level === 2) {
			const number = sections.length + 1
			sections.push({
				heading: { id: `bite-${biteNumber}-section-${number}`, label: `${biteNumber}.${number}`, text: block.text },
				isIssues: /common pitfalls/i.test(block.text),
				blocks: [],
			})
		} else {
			sections.at(-1)?.blocks.push(block)
		}
	}

	return sections
}
