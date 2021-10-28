import React from 'react'
import { Link } from 'react-router-dom'

const NavBarOpenLoggedIn = () => {
  return (
    <div>
      <nav className="Navbar_open">
        <ul className="nav-links-open">
          <li>
            <Link to="/kolcsonzes">Autókölcsönzés</Link>
          </li>
          <li>
            <Link to="/modelljeink">Modelljeink</Link>
          </li>
          <li>
            <Link to="/rolunk">Rólunk</Link>
          </li>
          <li>
            <Link to="/ajandekbolt">Hűségprogram</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBarOpenLoggedIn
