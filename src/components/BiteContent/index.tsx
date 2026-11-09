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

const BlockView = ({ block }: { block: Block }) => {
	switch (block.type) {
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
				// A note rather than an <aside>: outside a <section>, an <aside> is a complementary landmark of its own.
				<div className={styles.callout} role="note">
					<RichText text={block.text} />
				</div>
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
				// Focusable so a keyboard can scroll code wider than the page
				// and named so it says why when focused, as the table below is.
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				<pre className={styles.code} tabIndex={0} role="group" aria-label="Code example, scrollable">
					<code>{block.code}</code>
				</pre>
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
