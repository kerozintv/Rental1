import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import axios from 'axios';
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'









const Register = () => {


const history = useHistory();
const [registerInput, setRegister] = useState({

    v_nev: '',
    k_nev: '',
    phone: '',
    email: '',
    password: '',
    cpassword: '',
    error_list: [],
});

const handleInput = (e) => {
  e.persist();
  setRegister({...registerInput, [e.target.name]: e.target.value});

}

const registerSubmit = (e) => {



          axios.defaults.withCredentials = true;
          axios.defaults.headers.post['Content-Type'] = 'application/json';
          axios.defaults.headers.post['Accept'] = 'application/json'; 

          e.preventDefault();

          const data = {

            v_nev: registerInput.v_nev,
            k_nev: registerInput.k_nev,
            phone: registerInput.phone,
            email: registerInput.email,
            password: registerInput.password,
            cpassword: registerInput.cpassword,
            error_list: [],

          }

              axios.get('/sanctum/csrf-cookie').then(response => {


              axios.post(`/api/register`, data).then(res => {

                  if(res.data.status === 200)
                  {

                    history.push('/');
                    
                    
                  Swal.fire({
                      title: res.data.message,
                      icon: 'success',
                      iconColor: '#23552f',
                      showCancelButton: false,
                      showConfirmButton: true,
                      confirmButtonColor: '#23552f',
                      })

                  } 
                  
                  else 
                  
                  {

                   setRegister({...registerInput, error_list: res.data.validation_errors});

                  }

              });
          });



};  




  return (
    <div>
      <Navbar />
      <div className="empty_space"></div>
      <Banner title="Regisztráció" />

      <div className="register_form_container">
        <form onSubmit={registerSubmit} className="login_form">
          <br />
          <label htmlFor="" className="form_text">
            A mezők kitöltése kötelező!
          </label>

          <br />

          <input type="text" name="v_nev" onChange={handleInput} value={registerInput.v_nev} Placeholder="Vezetéknév" />
          
          <span className="error_message">{registerInput.error_list.v_nev}</span>

          <input type="text" name="k_nev" onChange={handleInput} value={registerInput.k_nev} Placeholder="Keresztnév" />

           <span className="error_message">{registerInput.error_list.k_nev}</span>

          <input type="phone" name="phone" onChange={handleInput} value={registerInput.phone} Placeholder="Telefonszám: (pl.301234567)" />

           <span className="error_message">{registerInput.error_list.phone}</span>

          <input type="email" name="email" onChange={handleInput} value={registerInput.email} Placeholder="Email-cím" />
       
            <span className="error_message">{registerInput.error_list.email}</span>

          <input type="password" name="password" onChange={handleInput} value={registerInput.password} Placeholder="Jelszó" />

           <span className="error_message">{registerInput.error_list.password}</span>
  
          <input type="password" name="cpassword" onChange={handleInput} value={registerInput.cpassword} Placeholder="Jelszó megerősítése" />
          <span className="error_message">{registerInput.error_list.cpassword}</span>
  
          <button type="submit" className="secondary_button">Regisztráció</button>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default Register
