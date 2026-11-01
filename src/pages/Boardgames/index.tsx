import { BOARDGAMES } from '../../data/boardgames'

import styles from './index.module.css'

export const Boardgames = () => {
  return (
    <div className={styles.page}>
      <header className={styles.page__header}>
        <h1 className={styles.page__title}>Boardgames</h1>
        <p className={styles.page__intro}>Games that hit the table.</p>
      </header>

      <ul className={styles.list}>
        {BOARDGAMES.map((game) => (
          <li key={game.title} className={styles.game}>
            <article>
              <h2 className={styles.game__title}>{game.title}</h2>
              <p className={styles.game__meta}>
                {game.players} · {game.playTime}
              </p>
              <p className={styles.game__description}>{game.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
