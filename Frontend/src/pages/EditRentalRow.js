/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from 'axios'
import edit_icon from '../components/imgs/edit_icon.png'
import save_icon from '../components/imgs/save_icon.png'
import Swal from 'sweetalert2'

const EditRentalRow = ({match}) => {

    const history = useHistory();

if(!localStorage.getItem('admin')){

    history.push('/');
    window.location.reload(false);
}









    

useEffect(() => {
fetchRentals();
}, []);



const [editInput, setEditInput] = useState({

    v_nev: '',
    k_nev: '',
    phone: '',
    statusz: '',

});


const handleInput = (e) => {

  e.persist();
  setEditInput({...editInput, [e.target.name]: e.target.value});

}



const fetchRentals = async() => {
        
          const row_data_raw = await axios.get(`api/admin/edit-rental/${match.params.rental_id}`);
          const row_data = row_data_raw.data.selected_row;

          setEditInput({
           v_nev: row_data.kolcsonzo_vezeteknev,
           k_nev: row_data.kolcsonzo_keresztnev,
           phone: row_data.kolcsonzo_telefon,
           statusz: row_data.statusz,
          
          });

    };


    const data = {
    row_id: match.params.rental_id,
    v_nev: editInput.v_nev,
    k_nev: editInput.k_nev,
    phone: editInput.phone,
    statusz: editInput.statusz,

    }


const editSubmit = (e) => {
 
e.preventDefault();   ////  <----  Fontos, különben folyamatosan frissíti az inputokat

axios.post(`/api/admin/update-rental`, data);

        Swal.fire(
        "Sikeres mentés!",
        '',
        'success'
        )

};





    return (
        <div className="edit-rental-container">
       
       <Link to="/admin/dashboard/kolcsonzesek">
        <button className="back_button">🠸 Vissza</button>
        </Link>

                <div className="edit_panel">
                
                 <form onSubmit={editSubmit}  className="edit_form">
                    <img className="edit_form_icon" src={edit_icon} alt="" />
                      <p>Kölcsönő vezetékneve:</p>
                     <input name="v_nev" type="text" onChange={handleInput} value={editInput.v_nev} />
                      <p>Kölcsönő keresztneve:</p>
                     <input name="k_nev" type="text" onChange={handleInput} value={editInput.k_nev}  />
                       <p>Kölcsönő telefonszáma:</p>
                     <input name="phone" type="text" onChange={handleInput} value={editInput.phone}  />
                      <p>Státusz:</p>
                      <select onChange={handleInput} name="statusz" id="select" value={editInput.statusz}>

                          <option  value="Átvételre vár.">Átvételre vár.</option>
                          <option  value="Elutasítva.">Elutasítva.</option>
                          <option  value="Kölcsönzés alatt.">Kölcsönzés alatt.</option>
                          <option  value="Kölcsönzés befejezve.">Kölcsönzés befejezve.</option>

                      </select>
                 <div>
                    <button type="submit" className="save_button">
                        <img className="save_icon" src={save_icon} alt="" /> Mentés 
                    </button>
                </div>
     
                 </form>

                 
                </div>


        </div>
    )
}

export default EditRentalRow
