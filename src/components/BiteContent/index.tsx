import cx from 'classnames'
import type { Block, ListBlock } from '../../data/a11yBites'
import type { BiteSection } from '../../utils/biteSections'

import { RichText } from '../RichText'

import styles from './index.module.css'

const List = ({ list }: { list: ListBlock }) => {
	const Tag = list.ordered ? 'ol' : 'ul'

	return (
		<Tag className={styles.list}>
			{list.items.map((item, index) => (
				<li key={index}>
					<RichText text={item.text} />
					{item.sublist ? <List list={item.sublist} /> : null}
				</li>
			))}
		</Tag>
	)
}

// A point numbered in its text ("1. The Unique Label Rule", also inside bold), whose number gets the accent colour of the
// numbers in the ordered lists, so every numbered point looks the same.
const NUMBER_PATTERN = /^(\*\*)?(\d{1,2}\.)\s+/

const NumberedText = ({ text }: { text: string }) => {
	const match = NUMBER_PATTERN.exec(text)
	if (!match) {
		return <RichText text={text} />
	}

	return (
		<>
			<span className={styles.number}>{match[2]}</span> <RichText text={`${match[1] ?? ''}${text.slice(match[0].length)}`} />
		</>
	)
}

const BlockView = ({ block }: { block: Block }) => {
	switch (block.type) {
		case 'heading':
			return (
				<h4 className={styles.subheading}>
					<NumberedText text={block.text} />
				</h4>
			)
		case 'paragraph':
			return (
				<p>
					<NumberedText text={block.text} />
				</p>
			)
		case 'quote':
			return (
				<figure className={styles.quote}>
					<blockquote className={styles.quote__text}>
						<RichText text={block.quote} />
					</blockquote>
					<figcaption className={styles.quote__author}>— {block.author}</figcaption>
				</figure>
			)
		case 'code':
			return (
				<div className={styles.example}>
					{/* The pre's name starts with this word, so a screen reader doesn't need to read it twice. */}
					<p className={styles.example__label} aria-hidden="true">
						Example
					</p>
					{/* Focusable so a keyboard can scroll code wider than the page
					    and named so it says why when focused, as the table below is. */}
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
					<pre className={styles.code} tabIndex={0} role="group" aria-label="Example code, scrollable">
						<code>{block.code}</code>
					</pre>
				</div>
			)
		case 'table':
			return (
				// Focusable so a keyboard can scroll a table wider than the page
				// and named so it says why when focused.
				// A group rather than a region, so it isn't a landmark nested inside the bite's own region.
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				<div className={styles.tableWrapper} tabIndex={0} role="group" aria-label="Table, scrollable">
					<table className={styles.table}>
						<thead>
							<tr>
								{block.header.map((cell, index) => (
									<th key={index} scope="col">
										<RichText text={cell} />
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{block.rows.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{row.map((cell, cellIndex) => (
										<td key={cellIndex}>
											<RichText text={cell} />
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)
		case 'list':
			return <List list={block} />
	}
}

const Blocks = ({ blocks }: { blocks: Block[] }) => blocks.map((block, index) => <BlockView key={index} block={block} />)

export const BiteContent = ({ sections }: { sections: BiteSection[] }) => {
	return (
		<div className={styles.content}>
			{sections.map((section) => {
				return (
					<div key={section.heading.id} className={cx(styles.section, section.isIssues && styles['section--issues'])}>
						<h3 id={section.heading.id} className={styles.heading}>
							<span className={styles.heading__badge} aria-hidden="true">
								{section.heading.label}
							</span>
							<RichText text={section.heading.text} />
						</h3>
						<Blocks blocks={section.blocks} />
					</div>
				)
			})}
		</div>
	)
}
