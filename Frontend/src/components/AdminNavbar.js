// rafce -> shortcut
import React, { useState } from 'react'
import logo from './imgs/logo.png'
import { Squash as Hamburger } from 'hamburger-react'
import AdminNavBarOpen from '../components/AdminNavbarOpen'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const AdminNavbar = () => {
  const [isOpen, setOpen] = useState(false)

  const history = useHistory();

const logoutSubmit = (e) => {

    e.preventDefault();
    

    axios.get('/sanctum/csrf-cookie',).then(response => {
    axios.post(`api/admin/logout`).then(res=>{

      if(res.data.status === 200)
      {
          
          
          localStorage.removeItem('admin');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('admin_v_nev');
          localStorage.removeItem('admin_k_nev');
         
                   
          history.push('/admin');
          window.location.reload(false);

      }


    })

   });
  } 





  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/admin/dashboard">Kezdőlap</Link>
          </li>

          <li>
            <Link to="/admin/dashboard/kolcsonzesek">Kölcsönzések</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/ajandekbolt">Ajándékbolt</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/dolgozok">Alkalmazottak</Link>
          </li>
          <li onClick={logoutSubmit}>
            Kijelentkezés
          </li>

        </ul>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </nav>
      {isOpen ? <AdminNavBarOpen /> : <navbar />}
    </div>
  )
}

export default AdminNavbar
