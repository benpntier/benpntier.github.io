import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './index.scss'

function Header() {
  return (
    <header className="header max-width">
      <Link to="/">
        <img src={Logo} alt="Kasa" className="header__logo" />
      </Link>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav__link nav__link--active' : 'nav__link'
          }
        >
          Accueil
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav__link nav__link--active' : 'nav__link'
          }
        >
          A Propos
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
