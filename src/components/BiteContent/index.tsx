import type { Block, ListBlock } from '../../data/a11yBites'
import type { BiteSection } from '../../utils/biteSections'

import { RichText } from '../RichText'

import { splitQuote } from '../../utils/splitQuote'

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

const BlockView = ({ block }: { block: Block }) => {
	switch (block.type) {
		// Top-level headings start a section, so only subheadings reach here.
		case 'heading':
			return (
				<h4 className={styles.subheading}>
					<RichText text={block.text} />
				</h4>
			)
		case 'paragraph':
			return (
				<p>
					<RichText text={block.text} />
				</p>
			)
		case 'callout':
			return (
				<aside className={styles.callout}>
					<RichText text={block.text} />
				</aside>
			)
		case 'quote': {
			const { quote, author } = splitQuote(block.text)

			return (
				<figure className={styles.quote}>
					<blockquote className={styles.quote__text}>
						<RichText text={quote} />
					</blockquote>
					{author ? <figcaption className={styles.quote__author}>— {author}</figcaption> : null}
				</figure>
			)
		}
		case 'code':
			return (
				// Scrollable region must be keyboard reachable.
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				<pre className={styles.code} tabIndex={0}>
					<code>{block.code}</code>
				</pre>
			)
		case 'table':
			return (
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				<div className={styles.tableWrapper} tabIndex={0} role="region" aria-label="Table, scrollable">
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
				if (!section.heading) {
					return <Blocks key="intro" blocks={section.blocks} />
				}

				return (
					<section
						key={section.heading.id}
						className={`${styles.section}${section.isIssues ? ` ${styles['section--issues']}` : ''}`}
						aria-labelledby={section.heading.id}
					>
						<h3 id={section.heading.id} className={styles.heading}>
							<span className={styles.heading__badge} aria-hidden="true">
								{section.heading.label}
							</span>
							<RichText text={section.heading.text} />
						</h3>
						<Blocks blocks={section.blocks} />
					</section>
				)
			})}
		</div>
	)
}
