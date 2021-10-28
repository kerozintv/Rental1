import React from 'react'
import logo from './imgs/logo.png'
import twitter from './imgs/twitter.png'
import facebook from './imgs/facebook.png'
import instagram from './imgs/instagram.png'
import { Link } from 'react-router-dom'

const FooterLoggedIn = () => {
  return (
    <div>
      <div className="footer_container">
        <ul className="block1">
          <h1>Oldaltérkép</h1>
          <Link to="/kolcsonzes">Autókölcsönzés</Link>
          <Link to="/modelljeink">Modelljeink</Link>
          <Link to="/rolunk">Rólunk</Link>
          <Link to="/husegprogram">Hűségprogram</Link>
          <Link to="/admin">Dolgozói belépés</Link>
        
        </ul>

        <ul className="block2">
          <h1>Közösségi média</h1>
          <a href="https://www.facebook.com/">
            <img src={facebook} alt="" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={instagram} alt="" />
          </a>
          <a href="https://www.twitter.com/">
            <img src={twitter} alt="" />
          </a>
        </ul>
      </div>

      <div className="block3">
        <img className="footer_logo" src={logo} alt="" />
        <br />
        <p>© rental1.com</p>
      </div>
    </div>
  )
}

export default FooterLoggedIn
