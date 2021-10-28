import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const AdminNavBarOpen = () => {


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
      <nav className="Navbar_open">
        <ul className="nav-links-open">
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
      </nav>
    </div>
  )
}

export default AdminNavBarOpen
