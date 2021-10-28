// rafce -> shortcut
import React, { useState, } from 'react'
import logo from './imgs/logo.png'
import { Squash as Hamburger } from 'hamburger-react'
import NavBarOpenLoggedIn from './NavBarOpenLoggedIn'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';
import {useHistory} from 'react-router-dom'


const StyledMenu = withStyles({
  paper: {
    border: 'none',
    background: '#171717',
    color: 'white',
    width: '190px',
    height: 'auto',
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  },
  
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));



const StyledButton = withStyles({
  root: {
    background: '#171717',
    color: 'white',
    width: 'auto',
    maxWidth: '170px',
    height: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.171)',
    borderRadius: '5px',
    padding: '0 20px',
    margin: "10px 20px 0px 0px",
    fontSize: '20px',
    '&:hover': {
       background: "#9c1a1a",
       border: '1px solid #9c1a1a',

       transition: "0.5s",
    },
  },
  
   
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const StyledButton2 = withStyles({
  root: {
    background: '#171717',
    color: 'white',
    width: 'auto',
    maxWidth: '170px',
    height: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.171)',
    borderRadius: '5px',
    padding: '0 20px',
    marginTop: "5px",

    marginLeft: "auto",
    marginRight: "auto",
    fontSize: '20px',
    '&:hover': {
       background: "#9c1a1a",
       border: '1px solid #9c1a1a',

       transition: "0.5s",
    },
  },
  
   
  label: {
    textTransform: 'capitalize',
  },
})(Button);
















const NavbarLoggedin = () => {


  const user_id = localStorage.getItem('user_id');


  const kereszt_nev = localStorage.getItem('k_nev');

  const [isOpen, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const history = useHistory();



  const logoutSubmit = (e) => {

    e.preventDefault();
    

    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post(`/api/logout`).then(res=>{

      if(res.data.status === 200)
      {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');               
          localStorage.removeItem('phone');
          localStorage.removeItem('v_nev');
          localStorage.removeItem('k_nev');
          localStorage.removeItem('user_id');
                   
          history.push('/');
          window.location.reload(false);

      }

    })

   });
  } 

///  Notifications setter

const [notifications, SetNotifications] = useState();


 // Check for notifications



    const fetchData = async() => {
          const notifications_data = await axios.get(`api/users/${user_id}`);
          const alerts = await notifications_data.data.notifications;
          SetNotifications(alerts);


    };


if(localStorage.getItem('auth_token')) {

    fetchData();







  } else {

    SetNotifications(0);
  }


  //  Display notifications 

      
    var AlertChecker = '';
    var AlertIndicator = '';

      if(notifications > 0) {

             AlertChecker = (
                <p className="notification_on">{notifications}</p> 
                            );

             AlertIndicator = (

                <p>Kölcsönzéseim ({notifications}) </p>
             ) 
                          


            } else {

               AlertChecker = (
                <p className="notification_off">{notifications}</p> 
                      );

                AlertIndicator = 'Kölcsönzéseim'; 

             }













 


  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/kolcsonzes">Autókölcsönzés</Link>
          </li>

          <li>
            <Link to="/modelljeink">Modelljeink</Link>
          </li>
          <li>
            <Link to="/rolunk">Rólunk</Link>
          </li>
          <li>
            <Link to="/ajandekbolt">Hűségprogram</Link>
          </li>

        
  
              <StyledButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}>
              {kereszt_nev}  {AlertChecker} ⏷ 
            </StyledButton>
   
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>

       <Link to={`/kolcsonzesek/${user_id}`}>
          <StyledButton2
              aria-controls="customized-menu"
              aria-haspopup="true"
              color="inherit"
            >
              {AlertIndicator}
            </StyledButton2>
     
       </Link>
                    <StyledButton2
              aria-controls="customized-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={logoutSubmit}
            >
              Kijelentkezés
            </StyledButton2>
        
        </StyledMenu>


   </ul>






        
       
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </nav>
      {isOpen ? <NavBarOpenLoggedIn /> : <navbar />}
    </div>
  )
}

export default NavbarLoggedin
