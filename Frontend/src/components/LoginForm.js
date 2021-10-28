import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useHistory,} from 'react-router-dom'





const LoginForm = (props) => {

  const history = useHistory();
  const [loginInput, setLogin] = useState({

  email_phone: '',
  password: '',
  error_list: [],

  });


    const handleInput = (e) => {

      e.persist();
      setLogin({...loginInput, [e.target.name]: e.target.value });
    }



    const ReRoute = () => {
                    
                    history.push('/kolcsonzes');
                    window.location.reload(false);
                

    };









    const loginSubmit = (e) => {

      e.preventDefault();
      
      const data = {

          email_phone: loginInput.email_phone,
          password: loginInput.password,

      }

       axios.get('/sanctum/csrf-cookie').then(response => {
       axios.post(`api/login`, data).then(res => {


         if(res.data.status === 200)
         {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('phone', res.data.phone);
                    localStorage.setItem('user_id', res.data.user_id);
                    localStorage.setItem('v_nev', res.data.v_nev);
                    localStorage.setItem('k_nev', res.data.k_nev);
                    localStorage.setItem('auth_name', res.data.username);

                  Swal.fire({
                      title: res.data.message,
                      icon: 'success',
                      iconColor: '#23552f',
                      showCancelButton: false,
                      showConfirmButton: false,
                      })

                    ReRoute();


                        
       
                 
                     

         }

         else if(res.data.status === 401)
         {


            Swal.fire({
  
                     
                      text: res.data.message,
                      icon: 'warning',
                      iconColor: '#972626',
                      showCancelButton: false,
                      showConfirmButton: true,
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
    <div className="login_form_container">
      <form onSubmit={loginSubmit} className="login_form">
        <br />
        <label htmlFor="" className="form_text">
          {props.form_text}
        </label>
        <br />
        <input type="text" name="email_phone" onChange={handleInput} value={loginInput.email_phone} Placeholder="Email-cím vagy mobilszám" />
        <br />
         <span className="error_message">{loginInput.error_list.email_phone}</span>
        <input type="password" name="password" onChange={handleInput} value={loginInput.password} Placeholder="Jelszó" />
          <span className="error_message">{loginInput.error_list.password}</span>
        <br />
        <button type="submit" className="primary_button">Bejelentkezés</button>
        <br />
        <label htmlFor=""> vagy</label>
        <br />
        <Link to="/regisztracio">
          <button type="submit" className="secondary_button">Regisztráció</button>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
