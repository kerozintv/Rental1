import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import ReactPaginate from "react-paginate";
import loading2 from '../components/imgs/loading2.svg'
import delete_icon from '../components/imgs/delete_icon.png'
import plus_icon from '../components/imgs/plus_icon.png'
import Swal from 'sweetalert2'
import AdminNavbar from '../components/AdminNavbar'

import {Link} from 'react-router-dom'

const AdminEmployees = () => {



var TableContent = "";


//  <Link to={`/admin/dashboard/kolcsonzesek/edit-rental/${rentals.id}`}>

const DoubleCheck = (id) => {



Swal.fire({
  title: 'Biztosan törölni szeretné ezt az alkalmazottat?',
  text: "A módosítások véglegesek lesznek a rendszerben.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#23552f',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Igen',
  cancelButtonText: 'Mégsem'
}).then((result) => {
  if (result.isConfirmed) {

    const selected_id = id;

    RemoveEmployee(selected_id);

    Swal.fire(
      'Sikeres Törlés!',
      'Az alkalmazottat töröltük a rendszerből',
      'success'
    )
    setInterval(() => {
  window.location.reload(false);
}, 1100);
    
  }
})





}

const RemoveEmployee = (selected_id) => {


const data = selected_id;

axios.get(`api/admin/delete-employee/${data}`);



}








const [employeeList, setEmployeeList] = useState([]);
const [loading, setLoading] = useState(true);

const [employees, setEmployees] = useState(employeeList.slice(0, 10));
 const [pageNumber, setPageNumber] = useState(0);

  const EmployeesPerPage = 10;
  const pagesVisited = pageNumber * EmployeesPerPage;

  const displayEmployees = employees
    .slice(pagesVisited, pagesVisited + EmployeesPerPage)
    .map((employees) => {
     
      return (
    
                        <tr key={employees.id}>
                        <td>{employees.work_id}</td>
                        <td>{employees.vezetek_nev}</td>
                        <td>{employees.kereszt_nev}</td>
                        <td>
                             
                             <button onClick={() => DoubleCheck(employees.id)} className="delete-button">Törlés <img className="edit-icon" src={delete_icon} alt="" /> </button>
                             
                        </td>
                        </tr>
      )         
                        

     
    });

  const pageCount = Math.ceil(employees.length / EmployeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    


    if(loading === true) {

        TableContent = (
        <tr>

      
          <td><img className="svg_loader" src={loading2} alt="" /></td>
           <td><img className="svg_loader" src={loading2} alt="" /></td>
            <td><img className="svg_loader" src={loading2} alt="" /></td>
             <td><img className="svg_loader" src={loading2} alt="" /></td>
                
        
   

        </tr>
        );

      



    } else {



        TableContent = displayEmployees;




}





useEffect(() => {
getEmployeeDetails();
}, []);


const getEmployeeDetails = async() => {
        
          const employee_data_raw = await axios.get(`/api/admin/get-employees`);
          const employee_data = employee_data_raw.data.employees
          setEmployeeList(employee_data);
          setEmployees(employee_data);
          setLoading(false);

    };



/////  Access code
const accessCode = "admin01";

const [editInput, setEditInput] = useState({

    access_code: '',

});


const handleInput = (e) => {

  e.persist();
  setEditInput({...editInput, [e.target.name]: e.target.value});

}

var Content = "";


if(editInput.access_code === accessCode) {

Content = (         <div>
                    <table className="employees">
                        <tr>
                            <th>Dolgozói Azonosító</th>
                            <th>Vezetéknév</th>
                            <th>Keresztnév</th>
                           
                            <th>Műveletek</th>
                        </tr>

                            {TableContent}

                    </table>
                    
                    <br />

                     <ReactPaginate

                    previousLabel={"Előző"}
                    nextLabel={"Következő"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    activeClassName={"paginationActive"}
                     />

                    <br />
                    <Link to="/admin/dashboard/dolgozok/ujdolgozo">
                     <button className="add_employee"><img className="plus-icon" src={plus_icon} alt="" /> Új dolgozó hozzáadása</button>
                    </Link>
                    </div>

);


} else {

    Content = (
<div className="access_input">
 
     <p>Admin hozzáférési Kód:</p>
    <input name="access_code" type="password" onChange={handleInput} value={editInput.access_code}  />

</div>

);



}










































    
    return (
        <div className="dashboard-container">
        <AdminNavbar />

    
        <div className="admin_content">

        <div className="overview_panel">

                    <h1>Dolgozók</h1>
                   
                    {Content}



                
            </div>



        </div>
            
        </div>
    )
}

export default AdminEmployees
