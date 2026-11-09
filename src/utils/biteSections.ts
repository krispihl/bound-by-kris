import type { A11yBite, Block } from '../data/a11yBites'

export type BiteSection = {
	// label is the bite and section number, e.g. "1.2" for the second section of bite 1.
	heading: { id: string; label: string; text: string }
	// The "Common pitfalls" section, which is shown on its own card.
	isIssues: boolean
	blocks: Block[]
}

// Gives each section of a bite the id and number its heading and contents link need.
export const getBiteSections = ({ number: biteNumber, sections }: A11yBite): BiteSection[] =>
	sections.map((section, index) => ({
		heading: {
			id: `bite-${biteNumber}-section-${index + 1}`,
			label: `${biteNumber}.${index + 1}`,
			text: section.heading,
		},
		isIssues: section.isIssues ?? false,
		blocks: section.blocks,
	}))
