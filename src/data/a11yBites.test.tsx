import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BiteContent } from '../components/BiteContent'
import { RichText } from '../components/RichText'
import { getBiteSections } from '../utils/biteSections'

import { A11Y_BITES } from './a11yBites'

const EMOJI = /\p{Extended_Pictographic}/u

// Text nodes in the container that contain an emoji a screen reader would read out as part of the page.
const exposedEmoji = (container: HTMLElement) => {
	const found: string[] = []
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		const text = node.textContent ?? ''
		// Code is read as written, and the example markup shows emoji as the code it demonstrates.
		if (EMOJI.test(text) && !node.parentElement?.closest('[aria-hidden="true"], [role="img"], code')) {
			found.push(text)
		}
	}
	return found
}

describe('a11yBites emoji', () => {
	it('hides or labels every emoji in the bites', () => {
		for (const bite of A11Y_BITES) {
			const { container } = render(
				<>
					<RichText text={bite.summary} />
					<BiteContent sections={getBiteSections(bite)} />
				</>
			)

			expect(exposedEmoji(container), `bite ${bite.number}`).toEqual([])
		}
	})

	it('keeps emoji out of titles, which are not rendered as rich text', () => {
		expect(A11Y_BITES.filter((bite) => EMOJI.test(bite.title))).toEqual([])
	})
})
