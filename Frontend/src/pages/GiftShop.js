/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import NavbarLoggedin from '../components/NavbarLoggedin'
import Banner from '../components/Banner'
import FooterLoggedIn from '../components/FooterLoggedIn'
import GiftShopItem from '../components/GiftShopItem'
import {withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const GiftShop = () => {





const user_id = localStorage.getItem('user_id');

 useEffect(() => {
          fetchData();
          fetchPoints();
      }, []);



    const [giftshop_data, set_giftshop_data] = useState([]);
    const [husegpontok, set_husegpontok] = useState();


    const fetchData = async() => {
          const shop_data_raw = await axios.get(`api/giftstore/get-remaining-items`);
          const shop_data= await shop_data_raw.data.items;
          set_giftshop_data(shop_data);

    };

        const fetchPoints = async() => {
          const data_raw = await axios.get(`api/points/users/${user_id}`);
          const points = await data_raw.data.husegpontok;
          set_husegpontok(points);

    };




    const Redeem = (id) => {
    
    Swal.fire({
  
        text: "Biztosan be szeretné váltani pontjait erre a tételre?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#23552f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Igen, beváltom',
        cancelButtonText: 'Mégsem'

}).then((result) => {

  if (result.isConfirmed) {

        const data = {
          user_id: user_id,
          item_id: id,
        }

    
       axios.post(`api/giftstore/redeem-item`, data).then(res => {


        if(res.data.status === 200) {

           Swal.fire({
  
                      title: 'Az Ön kódja:',
                      text: res.data.message,
                      footer: 'FIGYELEM! Ha bezárja ezt az ablakot a kód eltűnik!',
                      icon: 'success',
                      iconColor: '#23552f',
                      showCancelButton: false,
                      confirmButtonColor: '#23552f',
                      

              }).then((result) => {

                if (result.isConfirmed) {
                      setInterval(() => {
                        window.location.reload(false);
                      }, 1000);


                }
              }) 





          } else if (res.data.status === 400) {


        
        
        
            Swal.fire({
  
                      title: 'Sajnáljuk :(',
                      text: res.data.message,
                      icon: 'warning',
                      iconColor: '#972626',
                      showCancelButton: false,
                      confirmButtonColor: '#23552f',

              })

                
              
        
          } 

     });



  }
}) 


}





  return (
    <div>
      <NavbarLoggedin />
      <div className="empty_space"></div>
      <Banner title="Hűségprogram" />
      <div className="huseg_wrapper">
        <div className="huseg_text">
          <p>
            A 2021.01.01 - től indult hűségprogramunkban szeretnénk
            megjutalmazni ügyfeleinket akik minket választanak! Minden nálunk 3
            nap vagy annál hoszzabb időre kölcsönzött gépjármű után 200
            hűségpont kerül jóváírásra ügyfelünk fiókján amelyeket a lentebb
            található ajándékokra válthat be! Gyűjtse Ön is a pontjait amiket
            beválthat! A pontozás az alábbi táblázat alapján történik:
          </p>

          <br />

          <table>
            <tr>
              <th>Kölcsönzési idő</th>
              <th>Pont</th>
            </tr>
            <tr>
              <td>3 nap</td>
              <td>200 </td>
            </tr>

            <tr>
              <td>4 nap</td>
              <td>250 </td>
            </tr>

            <tr>
              <td>5 nap</td>
              <td>350 </td>
            </tr>

            <tr>
              <td>6 nap</td>
              <td>500 </td>
            </tr>

            <tr>
              <td>7 nap</td>
              <td>1000 </td>
            </tr>
          </table>

          <br />
          <p>

            * FIGYELEM: A hűségprogram csak a 2021.01.01- től igénybe vet
            kölcsönzésekre vonatkozik, visszamenőlegesen nem.
            <br />

            * A hűségpontok csak akkor kerülnek jóváírásra fiókjában ha már átvette a járművet!
          </p>
        </div>
      </div>

      <div className="gift_shop_wrapper">
        <div className="gift_shop_banner">
          <h1>Ajándékbolt</h1>
        </div>
        <div className="points_banner">
         <p>Az Ön pontjai: <span className="highlighted_number">{husegpontok}</span></p>
    
        </div>

        <div className="giftshop_container">

                                {giftshop_data.map(data => (



                          <GiftShopItem action={() => Redeem(data.id)} id={data.id} name={data.item_name} price={data.item_price} picture={data.item_picture} remaining={data.item_remaining}        />
                        



                      ))}




        </div>
      </div>

      <FooterLoggedIn />
    </div>
  )
}

export default withRouter(GiftShop)
