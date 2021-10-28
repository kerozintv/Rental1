/* eslint-disable no-unused-vars */

/// Imports....
import React, { useState, useEffect } from 'react'
import Swiper from 'react-id-swiper'
import './App.scss'
import './image-gallery.scss'
import Slider from './components/Slider'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Link, Route, Redirect, useHistory } from 'react-router-dom'
import About from './pages/About'
import CountUp from 'react-countup'
import LoyaltyProgram from './pages/LoyaltyProgram'
import Register from './pages/Register'
import Login from './pages/Login'
import OurModels from './pages/OurModels'
import ScrollToTop from './components/scrollToTop'
import Expand from './components/CarCardExpand'
import GiftShop from './pages/GiftShop'
import CarRental_LoggedIn from './pages/CarRental_LoggedIn'
import Dashboard from './pages/Dashboard'
import axios from 'axios';
import NavbarLoggedIn from './components/NavbarLoggedin'
import FooterLoggedIn from './components/FooterLoggedIn'
import ProtectedRoute from './components/ProtectedRoute'
import UserRentals from './pages/UserRentals'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import EditRentalRow from './pages/EditRentalRow'
import AdminRental from './pages/AdminRental'
import AdminGiftStore from './pages/AdminGiftStore'
import AdminEmployees from './pages/AdminEmployees'
import AddEmployee from './pages/AddEmployee'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://rental1-backend.herokuapp.com";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function(config){

    const token = localStorage.getItem('auth_token'); 
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});





const App = () => {

const user_id = localStorage.getItem('user_id');

var isAuth = false;
var admin = false;

if(localStorage.getItem('auth_token')){

  isAuth = true;
} else {
      isAuth = false;
}


if(localStorage.getItem('admin')){

  admin = true;
} else {
      admin = false;
}

  

  return (
    <div className="front_end">
      <Router>
        <ScrollToTop />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/rolunk" exact component={About} />
          <Route path="/husegprogram" exact component={LoyaltyProgram} />
          <Route path="/login" exact component={Login} />
          <Route path="/regisztracio" exact component={Register} />
          <Route path="/modelljeink" exact component={OurModels} />
          <Route path="/admin" exact component={AdminLogin} />
          <Route path="/modelljeink/:id" exact component={Expand}/> 
          <Route path="/admin/dashboard/kolcsonzesek/edit-rental/:rental_id" exact component={EditRentalRow} />


          <ProtectedRoute path="/admin/delete-employee/:id" isAuth={isAuth} />
          <ProtectedRoute path="/checkdates/:model_id" isAuth={isAuth} />
          <ProtectedRoute path="/users/:user_id" isAuth={isAuth} />
          <ProtectedRoute path="/kolcsonzesek/:user_id" exact component={UserRentals} isAuth={isAuth}/>
          
          <ProtectedRoute exact path="/kolcsonzes" component={CarRental_LoggedIn} isAuth={isAuth} />
          <ProtectedRoute exact path="/ajandekbolt" component={GiftShop} isAuth={isAuth} />

           <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} isAdmin={admin}/>
           <AdminRoute exact path="/admin/dashboard/dolgozok/ujdolgozo" component={AddEmployee} isAdmin={admin}/>
           <AdminRoute exact path="/admin/dashboard/dolgozok" component={AdminEmployees} isAdmin={admin}/>
           <AdminRoute exact path="/admin/dashboard/ajandekbolt" component={AdminGiftStore} isAdmin={admin}/>
           <AdminRoute exact path="/admin/dashboard/kolcsonzesek" component={AdminRental} isAdmin={admin}/>
    
           <AdminRoute exact path="/admin/delete-employee/:id"  isAdmin={admin}/>




        </Switch>
      </Router>
    </div>
  )
}

export default App
