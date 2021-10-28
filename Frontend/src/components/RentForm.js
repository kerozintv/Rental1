import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import createTheme from '@material-ui/core/styles';
import adatkezelesi from '../adatkezelesi.pdf';
import axios from 'axios'
import {useState, useEffect} from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import hu from 'date-fns/locale/hu';
import Swal from 'sweetalert2'
import { format, addDays, isWithinInterval } from 'date-fns';




const RentForm = () => {


const history = useHistory();

//   MUI Selects Setup

  const [category, setCategory] = React.useState('');
  const [carInfo, setCarInfo] = useState([]);
  const [selected_category, Set_selected_category] = useState();
  const [model, setModel] = useState();


  

  const handleCategory = (event) => {
    setCategory(event.target.value);
    Set_selected_category(event.target.value);

  };

  const handleModels = (event) => {
    
    setModel(event.target.value);
   

  };



  // Auto fills the form with user's details + user id: 

  const vezetek_nev = localStorage.getItem('v_nev');
  const kereszt_nev = localStorage.getItem('k_nev');
  const telefon = localStorage.getItem('phone');
  const user_id = localStorage.getItem('user_id');

  //  Gets the car details... 

  useEffect(() => {
          fetchData();
          
      }, []);



    const fetchData = async() => {
          const car_data = await axios.get(`/api/modelljeink`);
          const car_info = await car_data.data.cars;
          setCarInfo(car_info);

    };




        let car_list = carInfo.filter(function (cars){
            return cars.car_category === selected_category;
      })

        let selected_car = carInfo.filter(function (cars){
            return cars.car_name === model;
            
      })

///  Car's ID

const car_id = selected_car.map(car => (car.id));

const car_rent_start = selected_car.map(car => (car.car_rental_begin));

const car_rent_end = selected_car.map(car => (car.car_rental_end));

var DateWarning = "";



 ///  Check if dates are vaild


  const DateCheck = () => {

      const formatedStartDay = format(startDate, "yyyy-MM-dd.");
      const formatedEndDay = format(endDate, "yyyy-MM-dd.");

                        const checkStartInterval = isWithinInterval(new Date(formatedStartDay),
                      { start: new Date(car_rent_start), end: new Date(car_rent_end) }
                      );

                      const checkEndInterval = isWithinInterval(new Date(formatedEndDay),
                      { start: new Date(car_rent_start), end: new Date(car_rent_end) }
                      );





                    if(checkStartInterval || checkEndInterval === true) {

                      DateWarning = (
                        
                            <div className="date_warning">
                              <p>Az Ön által válaszott modell az alábbi idő intervallumban kölcsönzés alatt áll:
                              <br />
                              <h1>{car_rent_start} - {car_rent_end} </h1>
                  
                              Kérjük válasszon másik modellt, vagy kölcsönzési időpontot!
                              </p>
                            </div>
                      
                      );


                                      } else {


                                            DateWarning = "";
                                      }


             

  }





////  Datepicker setup


const [startDate, setStartDate] = useState(null)
const [endDate, setendDate] = useState(null)


registerLocale('hu', hu)
setDefaultLocale('hu');




/// Send Notification 

const alert = 200;


const sendNotifcation = (e) => {

        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = 'application/json'; 

      

            const data = {

                        alert: alert,
                        user_id: user_id,

                      }


              axios.post('/api/kolcsonzes/push', data);
             
  


}





//  Caluclated Price

const duration =  Math.abs(endDate - startDate);
const duration_in_days = Math.ceil(duration / (1000 * 60 * 60 * 24)); 

const price = selected_car.map(car => (car.car_price));

const calculated_price = price * duration_in_days;

///  Handle form input 

const [formInput, setformInput] = useState({

    v_nev: '',
    k_nev: '',
    phone: '',
    error_list: [''],
    
});

const handleInput = (e) => {
  e.persist();
  setformInput({...formInput, [e.target.name]: e.target.value});

}


const [ischecked, setischecked] = useState(false);

const handleIsChecked = (e) => {

setischecked(e.target.checked);


}




//  Rent form submit


        const rentSubmit = (e) => {

            
          

          axios.defaults.withCredentials = true;
          axios.defaults.headers.post['Content-Type'] = 'application/json';
          axios.defaults.headers.post['Accept'] = 'application/json'; 

          e.preventDefault();




          

         
          const data = {

            v_nev: formInput.v_nev,
            k_nev: formInput.k_nev,
            phone: formInput.phone,
            adat_checkbox: ischecked,
            modell_id: car_id,
            kolcsonzes_kezdete: startDate,
            kolcsonzes_vege: endDate,
            user: user_id,
            error_list: [],

          }

              axios.get('/sanctum/csrf-cookie').then(response => {


              axios.post(`/api/kolcsonzes`, data).then(res => {

                  if(res.data.status === 200)
                  {

                        Swal.fire({
                          title: res.data.message,
                          confirmButtonText: 'Ok',
                          icon: 'success'
                        }).then((result) => {
                        
                          if (result.isConfirmed) {

                          sendNotifcation();

                          history.push('/kolcsonzes');
                         

                          }

                        })

                  } 
                  
                  else 
                  
                  {

                   setformInput({...formInput, error_list: res.data.validation_errors});

                  }

              });
          });

};

    ///  Is the rental null

    const check_if_null = () => {

      if(car_rent_start.[0] === null) {

        DateWarning = "";


      } else {

             // Calls the checkdate function here

        DateCheck();

      }

    };












    if (endDate !== null) {
      
      /// Calls a function that checks if the data is empty
   

      check_if_null();
     


      
     

    }






  ////  If no starting date has been selected:

  var kolcsonzesVege = '';


  if (startDate !== null) {

    kolcsonzesVege = (
                <DatePicker
            selected={endDate}
            onChange={(date) => setendDate(date)}
            minDate={addDays(startDate, 1)}
            placeholderText="Kölcsönzés vége:"
            dateFormat="yyyy-MM-dd."
            showDisabledMonthNavigation
          />

    );


  } else {

           kolcsonzesVege = '';
  }




    return (

    <div className="rent_form_container">
      <form onSubmit={rentSubmit} className="rent_form">
      
        <br />
        <label htmlFor="">Vezetéknév:</label>
        <input name="v_nev" onChange={handleInput} type="text" Placeholder={vezetek_nev} value={formInput.v_nev} />
        <br />
        <span className="error_message">{formInput.error_list.v_nev}</span>
        <br />
        <label htmlFor="">Keresztnév:</label>  

        


        <input name="k_nev" onChange={handleInput} type="text" Placeholder={kereszt_nev} value={formInput.k_nev} />
        <br />
        <span className="error_message">{formInput.error_list.k_nev}</span>
        <br />
        <label htmlFor="">Telefonszám: (Helyes formátum: 201231234 legfeljebb 9 karakter)</label>
        <input name="phone" onChange={handleInput} type="text" Placeholder={telefon} value={formInput.phone} />
        <br />
        <span className="error_message">{formInput.error_list.phone}</span>
        <br />

       <FormControl sx={{ m: 1, minWidth: 800 }}>
       
        <Select
          value={category}
          onChange={handleCategory}
          autoWidth
          displayEmpty>

          <MenuItem name='car_category' value={''} disabled >Kategória</MenuItem>
          <MenuItem name='car_category' value={'sedan'}>Sedan</MenuItem>
          <MenuItem name='car_category' value={'kombi'}>Kombi</MenuItem>
          <MenuItem name='car_category' value={'hibrid'}>Hibrid</MenuItem>
          <MenuItem name='car_category' value={'furgon'}>Furgon</MenuItem>
        </Select>
        <br />
        <Select
          value={model}
          onChange={handleModels}
          autoWidth
          displayEmpty>

          <MenuItem value={''} disabled >Modell</MenuItem>
          {car_list.map(car => (
            <MenuItem key={car.id} value={car.car_name}>{car.car_name}</MenuItem> ))}
        </Select>


      </FormControl>
       

       
        <br />
        
         <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={addDays(new Date(), 1)}
            placeholderText="Kölcsönzés kezdete:"
            dateFormat="yyyy-MM-dd."
            showDisabledMonthNavigation
        />


        <br />


            {kolcsonzesVege}

          <br />
          
          <span className="error_message">{formInput.error_list.kolcsonzes_kezdete}</span>

           <span className="error_message">{formInput.error_list.kolcsonzes_vege}</span>

            {DateWarning}

          <br />
         <p>( A minimum kölcsönzési idő 1 nap! )</p>

      
        <br />
        <div className="price_box">
        <p className="price_tag">Ár:  Kaució + {calculated_price} Ft </p>
        </div>
        <br />
        <input name="adat_checkbox" onChange={handleIsChecked} className="checkbox" type="checkbox" value={ischecked} />* Elfogadom az <a href={adatkezelesi}  rel="noopener noreferrer" target="_blank">adatkezelési nyilatkozatot.</a> 
        <br />
        <span className="error_message">{formInput.error_list.adat_checkbox}</span>
        <br />
        <button type="submit" className="primary_button">Kölcsönzés ⯈</button>
        <br />
        <br />
      </form>
    </div>
    )
}

export default RentForm
