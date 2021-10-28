import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="empty_space"></div>
      <Banner title="Bejelentkezés" />
      <LoginForm form_text="Jelentkezzen be E-mail címe vagy telefonszáma megadásával." />
      <Footer />
    </div>
  )
}

export default Login
