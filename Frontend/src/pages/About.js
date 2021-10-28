import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import CarKey from '../components/imgs/car_key.png'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import NavbarLoggedIn from '../components/NavbarLoggedin'
import FooterLoggedIn from '../components/FooterLoggedIn'

const About = () => {

    var AuthNavbar = '';
    var AuthFooter = '';
    var HusegLink = '';

if(localStorage.getItem('auth_token'))

{

    AuthNavbar = (
     <NavbarLoggedIn/>
                );

    AuthFooter = (
     <FooterLoggedIn/>
                );
    HusegLink = (
      '/ajandekbolt'
    );

} else {

  AuthNavbar = (
     <Navbar/>
                );

    AuthFooter = (
     <Footer/>
                );   

     HusegLink = (
      '/husegprogram'
    );         

    
}








  return (
    <div>
      {AuthNavbar}
      <div className="empty_space"></div>

      <Banner title="Rólunk" />

      <div className="about_banner_container">
        <img src={CarKey} alt="" className="about_banner" />
        <h1 className="banner_text">
          Nálunk tényleg ilyen egyszerű a kölcsönzés.
        </h1>
      </div>
      <div className="about_container">
        <div className="counter_container">
          <div className="counterbox">
            <div className="counter">
              <CountUp delay={0.5} start={0} end={7654} duration={0.5} />
            </div>
            <h1>Kölcsönzés</h1>
          </div>

          <div className="counterbox">
            <div className="counter">
              <CountUp delay={0.5} start={0} end={14} duration={0.5} />
            </div>
            <h1>Partner</h1>
          </div>

          <div className="counterbox">
            <div className="counter">
              <CountUp
                delay={0.5}
                start={0}
                end={99}
                suffix={' %'}
                duration={0.5}
              />
            </div>
            <h1>Ügyfél elégedettség</h1>
          </div>
        </div>
      </div>

      <div className="about_text">
        <p>
          Az eredményeink magukért beszélnek, a cégünk 12 éves működése során
          már 7654 kölcsönzést biztosítottunk, valamint 14 partnerünk lett. Az
          ügyfél elégedettségünk 12 év után is 99%-os. 2021.01.01 - től
          bevezettük új hűségprogramunkat amelyet akár már egyszeri kölcsönzés
          után is igénybe vehet.
        </p>

        <br />
        <Link to={HusegLink}>
          <button className="primary_button">Részletek</button>
        </Link>
      </div>

     {AuthFooter}
    </div>
  )
}

export default About
