import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import edit_icon from '../components/imgs/edit_icon.png'
import save_icon from '../components/imgs/save_icon.png'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'



const AddEmployee = () => {

useEffect(() => {
GenerateWorkerId();
}, []);


const GenerateWorkerId = async() => {
        
          const employee_data_raw = await axios.get(`/api/admin/generate-employee-id`);
          const employee_id = employee_data_raw.data.worker_id;

          setEditInput({
              work_id: employee_id,
          
          });

    };































const submitNewEmployee = (e) => {

    e.preventDefault();

    const data = {
    v_nev: editInput.v_nev,
    k_nev: editInput.k_nev,
    work_id: editInput.work_id,
    password: editInput.password,

    }


axios.post(`/api/admin/add-new-employee`, data);

        Swal.fire(
        "Sikeres mentés!",
        '',
        'success'
        )

     
}





const [editInput, setEditInput] = useState({

    v_nev: '',
    k_nev: '',
    work_id: '',
    password: '',

});


const handleInput = (e) => {

  e.persist();
  setEditInput({...editInput, [e.target.name]: e.target.value});

}




    return ( 
        <div className="edit-rental-container">

                        <Link to="/admin/dashboard/dolgozok">
                            <button className="back_button">🠸 Vissza</button>
                            </Link>


                <div className="edit_panel">

                
                 <form onSubmit={submitNewEmployee} className="edit_form">
                    <img className="edit_form_icon"  alt="" />
                      <p>Alkalmazott vezetékneve:</p>
                     <input name="v_nev" type="text" onChange={handleInput} value={editInput.v_nev} />
                      <p>Alkalmazott keresztneve:</p>
                     <input name="k_nev" type="text" onChange={handleInput} value={editInput.k_nev}  />
                      <p>Alkalmazott azonosítója</p>
                     <input name="work_id" type="text" onChange={handleInput} value={editInput.work_id}  />
                      <p>Alkalmazott jelszava:</p>
                      
                     <input name="password" type="password" onChange={handleInput} value={editInput.password}  />

                     

                 <div>
                    <button type="submit" className="save_button">
                        <img className="save_icon"  src={save_icon} alt="" /> Mentés 
                    </button>
                </div>
     
                 </form>
            </div>
        </div>
    )
}

export default AddEmployee
