/// Imports....


import '../App.scss'
import '../image-gallery.scss'
import Slider from '../components/Slider'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'
import { useHistory } from 'react-router-dom'
import NavbarLoggedIn from '../components/NavbarLoggedin'
import FooterLoggedIn from '../components/FooterLoggedIn'

// Homepage

const Home = () => {

const history = useHistory();


    var AuthNavbar = '';
    var AuthFooter = '';

if(localStorage.getItem('auth_token')){

    history.push('/kolcsonzes');
    window.location.reload(false);

    AuthNavbar = (
     <NavbarLoggedIn/>
                );

    AuthFooter = (
     <FooterLoggedIn/>
                );


} else {


  AuthNavbar = (
     <Navbar/>
                );

    AuthFooter = (
     <Footer/>
                );            

    
}

  return (
    <div className="front_end">

     {AuthNavbar}
      <div className="slider_bg">
      <Slider />
     
      </div>
      <Banner title="Autókölcsönzés" />

      <LoginForm form_text="Az autókölcsönzéshez be kell jelentkeznie!" />

      {AuthFooter}

    </div>
  )
}




export default Home