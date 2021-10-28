import React from 'react'
import NavbarLoggedin from '../components/NavbarLoggedin'
import Banner from '../components/Banner'
import RentForm from '../components/RentForm'
import FooterLoggedIn from '../components/FooterLoggedIn'
import {withRouter} from 'react-router-dom'



const CarRental_LoggedIn = () => {
    return (
        <div className="car_rental_logged_in_container">

      <NavbarLoggedin />
      <div className="empty_space"></div>
      
      <Banner title="Autókölcsönzés" /> 

      <RentForm />

      
      <FooterLoggedIn />
     
      </div>
        
    )
}

export default withRouter(CarRental_LoggedIn)
