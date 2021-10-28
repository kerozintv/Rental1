import React from 'react'
import { useState, useEffect, useToggle } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import AdminNavbar from '../components/AdminNavbar'

import {Link} from 'react-router-dom'




const AdminGiftStore = () => {



useEffect(() => {

    
    let DataFetch = setInterval( () => {
      fetch_remaining_items();
    },1000)

    return () => clearInterval(DataFetch);
}, []);





const [itemDetails, setItemDetails] = useState([]);



const fetch_remaining_items = async() => {
        
          const item_data_raw = await axios.get(`api/giftstore/get-remaining-items`);
          const item_data = item_data_raw.data.items;
          setItemDetails(item_data);

    };

        let starbucks_data = itemDetails.filter(function (items){
            return items.item_name === "StarBucks ajándékutalvány - 10 000 Ft";
      })
         

      



        let sb_remaining = starbucks_data.map(data => (data.item_remaining));


        let wizzair_data = itemDetails.filter(function (items){
            return items.item_name === "WizzAir ajándék kupon -25% (minden járat) ";
      })

        let wa_remaining = wizzair_data.map(data => (data.item_remaining));


        let burgerking_data = itemDetails.filter(function (items){
            return items.item_name === "BurgerKing ajándékutalvány - 10 000 Ft ";
      })

        let bk_remaining = burgerking_data.map(data => (data.item_remaining));
        





const [starbucks_isClicked, set_starbucks_IsClicked] = useState(false);
const [wizzair_isClicked, set_wizzair_IsClicked] = useState(false);
const [burgerking_isClicked, set_burgerking_IsClicked] = useState(false);

const handleSBClick = () => {
    set_starbucks_IsClicked(!starbucks_isClicked);
}
const handleWAClick = () => {
    set_wizzair_IsClicked(!wizzair_isClicked);
}

const handleBKClick = () => {
    set_burgerking_IsClicked(!burgerking_isClicked);
}


var starbucks_class= "inputs_active";
var wizzair_class = "inputs_active";
var burgerking_class = "inputs_active";


//// Toggle classes


if (starbucks_isClicked === true) {

    starbucks_class = "inputs_active"

} else {

    starbucks_class = "inputs_inactive"
}

if (wizzair_isClicked === true) {

    wizzair_class = "inputs_active"

} else {

    wizzair_class = "inputs_inactive"
}

if (burgerking_isClicked === true) {

    burgerking_class = "inputs_active"

} else {

    burgerking_class = "inputs_inactive"
}





/////////// Starbucks inputs

const [sbInput, setsbInput] = useState();

const handleSBInput = (e) => {
    e.persist();
    setsbInput(e.target.value);
}


const StarBucksSubmit = () => {

axios.get('/sanctum/csrf-cookie').then(response => {
        const data = {
        'sb_code': sbInput,
        }
         axios.post('api/admin/add-new-starbucks', data); 
    

})



Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Sikeres kódfeltöltés!',
  showConfirmButton: false,
  timer: 1200
})



}

///////////// WizzAir inputs


const [waInput, setwaInput] = useState();

const handleWAInput = (e) => {
    e.persist();
    setwaInput(e.target.value);
}


const WizzAirSubmit = () => {

axios.get('/sanctum/csrf-cookie').then(response => {
        const data = {
        'wa_code': waInput,
        }
         axios.post('api/admin/add-new-wizzair', data); 
    

})

Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Sikeres kódfeltöltés!',
  showConfirmButton: false,
  timer: 1200
})



}


//// BurgerKing inputs

const [bkInput, setbkInput] = useState();

const handleBKInput = (e) => {
    e.persist();
    setbkInput(e.target.value);
}


const BurgerKingSubmit = () => {

axios.get('/sanctum/csrf-cookie').then(response => {
        const data = {
        'bk_code': bkInput,
        }
         axios.post('api/admin/add-new-burgerking', data); 
    

})

Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Sikeres kódfeltöltés!',
  showConfirmButton: false,
  timer: 1200
})



}



















               
                  

      
        return (
                <div className="dashboard-container">

                    <AdminNavbar />

                
        <div className="admin_content">

            <div className="overview_panel">
           <div className="giftstore_instore">
               <p>Starbucks utalványok raktáron: <span className="highlighted-remaining">{sb_remaining}</span></p>
               <p>Wizzair utalványok raktáron: <span className="highlighted-remaining">{wa_remaining}</span> </p>
               <p>BurgerKing utalványok raktáron: <span className="highlighted-remaining">{bk_remaining}</span> </p>
           </div>
            <button onClick={handleSBClick} className="upload">Starbucks kód feltöltés</button>
                     <div className={starbucks_class}>
                        
                            <input onChange={handleSBInput} className="code_input_active" type="text" /> 
                            <button type="submit" onClick={StarBucksSubmit} className="code_upload">Feltöltés</button>

                        </div>

                    <button onClick={handleWAClick} className="upload">WizzAir kód feltöltés</button>

                                    <div className={wizzair_class}>
                                    <input onChange={handleWAInput} className="code_input_active" type="text" /> 
                                    <button type="submit"  onClick={WizzAirSubmit} className="code_upload">Feltöltés</button>
                                    </div>

                        <button onClick={handleBKClick} className="upload">BurgerKing kód feltöltés</button>

                                            <div className={burgerking_class}>
                                                <input  onChange={handleBKInput} className="code_input_active" type="text" /> 
                                                <button type="submit" onClick={BurgerKingSubmit} className="code_upload">Feltöltés</button>
                                            </div>



            </div>

        </div>
            
     
            
        </div>
    )
}

export default AdminGiftStore











    




 