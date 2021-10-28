import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import CarCard from '../components/CarCard'
import NavbarLoggedIn from '../components/NavbarLoggedin'
import FooterLoggedIn from '../components/FooterLoggedIn'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import createTheme from '@material-ui/core/styles'
import {Redirect} from 'react-router-dom'
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import axios from 'axios'
import {useState, useEffect} from 'react'



const OurModels = () => {



    var AuthNavbar = '';
    var AuthFooter = '';


if(localStorage.getItem('auth_token'))

{

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




const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9c1a1a00',
    }
  },
  text: {
    primary: '#9c1a1a93'
  }
})


const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(5),
    minWidth: 200,
    padding: '0px',
    border: '1px solid 9c1a1a',
    background: 'transparent',
    color: 'white',
          '&:focus': {
        color: 'white',
        background: 'black',
      }
  },

  Label: {
  
  color: 'black'


  },

}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
          '&:hover': {
        color: 'white',
        background: 'black',
      },
      '&:focus': {
        color: 'white',
        background: 'black',
      },
    
    '&$disabled': {
      color: 'black',
      background: 'black',
      
    },

    


    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 50,
    padding: '0 20px',
   boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    margin: "20px 0px 0px 0px",

  },
  
}))(MenuItem);

const StyledSelect = withStyles((theme) => ({
  root: {
    background: '#1717176e',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 'auto',
    padding: '20px',
    boxShadow: '0px 5px 8px #1717176e',
    margin: "auto",
    fontSize: '20px',

  },
  
}))(Select);


/////////////////////// Adatok lekérdezése az adatbázisból

 useEffect(() => {
          fetchData();
      }, []);
 

    const [selected_category, Set_selected_category] = useState();

    const [carInfo, setCarInfo] = useState([]);

    const fetchData = async() => {
          const car_data = await axios.get(`/api/modelljeink`);
          const car_info = await car_data.data.cars;
          setCarInfo(car_info);

    };


      let car_list = carInfo.filter(function (cars){
            return cars.car_category === selected_category;
      })




  const classes = useStyles();
  const [value, setValue,] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    Set_selected_category(event.target.value);



  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };



  return (
    <div className="modelljeink_container">
      <div className="empty_space"></div>

      {AuthNavbar}

      <Banner title="Modelljeink" />

      <div className="filter_container">

        <form>


        <ThemeProvider theme={theme}>
        <FormControl variant="outlined" className={classes.formControl}>
        <StyledSelect
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
          displayEmpty
         
        >
          <StyledMenuItem name='car_category' value={''} disabled>Kategória</StyledMenuItem>
          <StyledMenuItem name='car_category' value={'sedan'}>Sedan</StyledMenuItem>
          <StyledMenuItem name='car_category' value={'kombi'}>Kombi</StyledMenuItem>
          <StyledMenuItem name='car_category' value={'hibrid'}>Hibrid</StyledMenuItem>
          <StyledMenuItem name='car_category' value={'furgon'}>Furgon</StyledMenuItem>

        </StyledSelect>
  
      </FormControl>
</ThemeProvider>
  
         </form>
      
      </div>


    <div className="carlist_container">

                      {car_list.map(car => (



                        <CarCard id={car.id} car_name={car.car_name} picture={car.car_picture}         />
                        



                      ))}


        </div>


      {AuthFooter}


    </div>
  )
}

export default OurModels
