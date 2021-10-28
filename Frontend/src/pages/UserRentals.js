/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import NavbarLoggedin from '../components/NavbarLoggedin'
import Banner from '../components/Banner'
import FooterLoggedIn from '../components/FooterLoggedIn'
import {useState, useEffect} from 'react'
import axios from 'axios'
import loading2 from '../components/imgs/loading2.svg'






const UserRentals = (e) => {


const user_id = localStorage.getItem('user_id');


///  Clears the notifications

const clearNotifications = () => {

axios.get(`/api/clearNotifications/${user_id}`)

};

clearNotifications();



const [userRentals, setUserRentals] = useState([]);



          axios.defaults.withCredentials = true;
          axios.defaults.headers.post['Content-Type'] = 'application/json';
          axios.defaults.headers.post['Accept'] = 'application/json'; 

       

            useEffect(() => {
                    fetchData();
                    
                }, []);

    const [loading, setLoading] = useState(true);

    const fetchData = async() => {
          const rentalRawData = await axios.get(`/api/getUserRentals/${user_id}`);
          const rentalData = await rentalRawData.data.user_rentals;
          setUserRentals(rentalData);
          setLoading(false);

    };




    var content = '';

    if(loading === true) {

      content = (
                    <tr>
                    <td></td>
                    <td></td>
                     <td><img className="svg_loader" src={loading2} alt="" /></td>
                     <td></td>
                    <td></td>
                     <td></td>
                    
                     </tr>
        
                );


    } else {

        
        
            content=(userRentals.map(rentals => (
                    <tr key={rentals.id}>
                    <td>{rentals.kolcsonzes_id}</td>
                    <td>{rentals.kolcsonzott_modell}</td>
                    <td>{rentals.kolcsonzes_start}</td>
                    <td>{rentals.kolcsonzes_end}</td>
                    <td>{rentals.fizetendo}</td>
                    <td>{rentals.statusz}</td>

                    </tr>
            
            
            )

        ))

    }
       




    return (
        <div>

        <NavbarLoggedin />
        <div className="empty_space"></div>
        <Banner title="Kölcsönzések" /> 
        <div className="user_rentals">,
            <div className="rentals_table">
                <table>
                <tr>
                    <th>Kölcsönzés azonosító kód</th>
                    <th>Kölcsönzött modell</th>
                    <th>Kölcsönzés kezdete</th>
                    <th>Kölcsönzés vége</th>
                    <th>Fizetendő</th>
                    <th>Státusz</th>
                </tr>

                         {content}


                </table>
            </div>
            
        </div>
        <FooterLoggedIn />

     
    
            
        </div>
    )
}

export default UserRentals
