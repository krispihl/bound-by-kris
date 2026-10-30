import type { Block, ListBlock } from '../../data/a11yBites'

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
      return block.level === 2 ? (
        <h3 className={styles.heading}>
          <RichText text={block.text} />
        </h3>
      ) : (
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
    case 'quote':
      return (
        <blockquote className={styles.quote}>
          <RichText text={block.text} />
        </blockquote>
      )
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

export const BiteContent = ({ blocks }: { blocks: Block[] }) => (
  <div className={styles.content}>
    {blocks.map((block, index) => (
      <BlockView key={index} block={block} />
    ))}
  </div>
)
