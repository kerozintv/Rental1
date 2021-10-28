// rafce -> shortcut
import React, { useState } from 'react'
import logo from './imgs/logo.png'
import { Squash as Hamburger } from 'hamburger-react'
import NavBarOpen from './NavBarOpen'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="" className="logo" />
        <ul className="nav-links">
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
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </nav>
      {isOpen ? <NavBarOpen /> : <navbar />}
    </div>
  )
}

export default Navbar
