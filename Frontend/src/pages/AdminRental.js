import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import edit_icon from '../components/imgs/edit_icon.png'
import {Link} from 'react-router-dom'
import loading2 from '../components/imgs/loading2.svg'
import ReactPaginate from "react-paginate";
import AdminNavbar from '../components/AdminNavbar'

const AdminRental = () => {



const [loading, setLoading] = useState(true);
const [rentalList, setrentalList] = useState([]);

 const [carRentals, setCarRentals] = useState(rentalList.slice(0, 10));
 const [pageNumber, setPageNumber] = useState(0);

  const rentalsPerPage = 10;
  const pagesVisited = pageNumber * rentalsPerPage;

  const displayRentals = carRentals
    .slice(pagesVisited, pagesVisited + rentalsPerPage)
    .map((rentals) => {
      return (
    
                        <tr key={rentals.id}>
                        <td>{rentals.kolcsonzes_id}</td>
                        <td>{rentals.kolcsonzo_vezeteknev + " " + rentals.kolcsonzo_keresztnev}</td>
                        <td>{rentals.kolcsonzo_telefon}</td>
                        <td>{rentals.kolcsonzott_modell}</td>
                        <td>{rentals.kolcsonzes_start}</td>
                        <td>{rentals.kolcsonzes_end}</td>
                        <td>{rentals.statusz}</td>
                        <td>{rentals.fizetendo}</td>
                        <td>
                        <Link to={`/admin/dashboard/kolcsonzesek/edit-rental/${rentals.id}`}>
                        <button className="edit-button">Szerkesztés <img className="edit-icon" src={edit_icon} alt="" /> </button>
                        </Link>
                        </td>
                        </tr>
      )         
                        

     
    });

  const pageCount = Math.ceil(carRentals.length / rentalsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };




useEffect(() => {
                   fetchRentals();
                   
                    
                }, []);

     const fetchRentals = async() => {
          const rental_data_raw = await axios.get(`/api/dashboard/kolcsonzesek`);
          const rental_data = await rental_data_raw.data.kolcsonzesek;
          setrentalList(rental_data);
          setCarRentals(rental_data);
          
          setLoading(false);

    };


                      
                       
                      
    
                        
                     
                      

    var TableContent = "";


    if(loading === true) {

        TableContent = (
        <tr>

      
          <td><img className="svg_loader" src={loading2} alt="" /></td>
           <td><img className="svg_loader" src={loading2} alt="" /></td>
            <td><img className="svg_loader" src={loading2} alt="" /></td>
             <td><img className="svg_loader" src={loading2} alt="" /></td>
              <td><img className="svg_loader" src={loading2} alt="" /></td>
               <td><img className="svg_loader" src={loading2} alt="" /></td>
                <td><img className="svg_loader" src={loading2} alt="" /></td>
                 <td><img className="svg_loader" src={loading2} alt="" /></td>
                  <td><img className="svg_loader" src={loading2} alt="" /></td>
        
   

        </tr>
        );

      



    } else {



TableContent = displayRentals;




}





    return (
        <div className="dashboard-container">

               <AdminNavbar />

            <div className="admin_content">
                <div className="overview_panel">

                    <h1>Kölcsönzések</h1>
                    <br />
                    <table className="admin-kolcsonzesek">
                        <tr>
                            <th>Kölcsönzés azonosító</th>
                            <th>Kölcsönző neve</th>
                            <th>Kölcsönző telefonszáma</th>
                            <th>Kölcsönzött modell</th>
                            <th>Kölcsönzés kezdete</th>
                            <th>Kölcsönzés vége</th>
                            <th>Státusz</th>
                            <th>Fizetendő</th>
                            <th>Műveletek</th>
                        </tr>

                      
                            { TableContent }
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

                </div>  
             </div> 
        </div>
    )
}

export default AdminRental


 




     
   

    