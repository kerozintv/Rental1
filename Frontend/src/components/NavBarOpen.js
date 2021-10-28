import React from 'react'
import { Link } from 'react-router-dom'

const NavBarOpen = () => {
  return (
    <div>
      <nav className="Navbar_open">
        <ul className="nav-links-open">
          <li>
            <Link to="/">Autókölcsönzés</Link>
          </li>
          <li>
            <Link to="/modelljeink">Modelljeink</Link>
          </li>
          <li>
            <Link to="/rolunk">Rólunk</Link>
          </li>
          <li>
            <Link to="/husegprogram">Hűségprogram</Link>
          </li>
          <li>
            <Link to="/login">Bejelentkezés</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBarOpen
