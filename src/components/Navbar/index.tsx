import { NavLink } from 'react-router-dom'

import styles from './index.module.css'

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => `${styles.link}${isActive ? ` ${styles['link--active']}` : ''}`}>
        Home
      </NavLink>
      <NavLink to="/books" className={({ isActive }) => `${styles.link}${isActive ? ` ${styles['link--active']}` : ''}`}>
        Books
      </NavLink>
    </nav>
  )
}
