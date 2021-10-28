import React from 'react'
import mini_logo from '../components/imgs/logo.png'
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'


const AdminLogin = () => {


                    
  const history = useHistory();

                

   
    if(localStorage.getItem("admin")){
      history.push('/admin/dashboard');
       window.location.reload(false);
       
    }














  const [loginInput, setLogin] = useState({

  work_id: '',
  password: '',
  error_list: [],

  });


    const handleInput = (e) => {

      e.persist();
      setLogin({...loginInput, [e.target.name]: e.target.value });
    }


    const loginSubmit = (e) => {

      e.preventDefault();
      
      const data = {

          work_id: loginInput.work_id,
          password: loginInput.password,

      }

       axios.get('/sanctum/csrf-cookie').then(response => {
       axios.post(`api/admin/login`, data).then(res => {


         if(res.data.status === 200)
         {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('admin_v_nev', res.data.admin_v_nev);
                    localStorage.setItem('admin_k_nev', res.data.admin_k_nev);
                    localStorage.setItem('admin', true);
     
                    
            Swal.fire({
  
                      
                      title: res.data.message,
                      icon: 'success',
                      iconColor: '#23552f',
                      showCancelButton: false,
                      showConfirmButton: false,
                      

              })

                  
             window.location.reload(false);
           

         }

         else if(res.data.status === 401)
         {
            Swal.fire({
  
                      
                      title: res.data.message,
                      icon: 'warning',
                      iconColor: '#972626',
                      showCancelButton: false,
                      confirmButtonColor: '#23552f',

              })

         }

         else 
         {

           setLogin({...loginInput, error_list: res.data.validation_errors });

         }
         

             
       });
});


 }













    return (
        <div className="admin_login_container" >
                <div className="panel_blur"></div>
                <div className="panel2">
                <div className="admin_login_form">
                
                            <form onSubmit={loginSubmit}>
                                <img className="logo_admin_panel" src={mini_logo} alt="" />
                                <br />
                                <label htmlFor="">Alkalmazotti azonosító:</label>
                                <br />
                                <input type="text" name="work_id" onChange={handleInput} value={loginInput.work_id} Placeholder="Alkalmazotti azonosító" />
                                <br />
                                <span className="error_message">{loginInput.error_list.work_id}</span>
                                <br />
                                 <label htmlFor="">Jelszó:</label>
                                <br />
                                <input type="password" name="password" onChange={handleInput} value={loginInput.password} Placeholder="Jelszó" />
                                <span className="error_message">{loginInput.error_list.password}</span>
                                <br />
                                <button type="submit" className="primary_button">Bejelentkezés</button>

                                <br />
                                <br />
                             </form>

                    </div>
                </div>
        </div>
    )
}

export default AdminLogin
