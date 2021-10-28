import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import AdminNavbar from '../components/AdminNavbar'

import {Link, useHistory , Redirect} from 'react-router-dom'










const AdminDashboard = () => {



axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'; 


const [dt, setDt] = useState(new Date().toLocaleString());

useEffect(() => {

    fetchWeeklyData();


    let secTimer = setInterval( () => {
      setDt(new Date().toLocaleString())
    },1000)

    return () => clearInterval(secTimer);
}, []);



    const [response, setResponse] = useState([]);



    const fetchWeeklyData = async() => {
          const raw_response = await axios.get(`/api/dashboard/overview`);
          const response_data = await raw_response.data;
          setResponse(response_data);

    };

    let kolcsonzott_modellek = response.kolcsonzott_modellek;

    let vezetek_nev = localStorage.getItem("admin_v_nev");
    let kereszt_nev = localStorage.getItem("admin_k_nev");














    return (
        <div className="dashboard-container">
        
         <AdminNavbar />

        <div className="admin_content">

        <div className="overview_panel">
                <h1>Heti összegzés</h1>
                    <p>Üdv a rendszerben, {vezetek_nev + " " + kereszt_nev}!</p>
                    <p>{dt}</p>
                   
                    <table className="admin_ov_table">
                        <tr>
                            <th>A heti pénzforgalom:</th>
                            <th>Heti kölcsönzések:</th>
                        </tr>
                                <tr>
                                    <td>{response.heti_bevetel} Ft</td>
                                    <td>{response.heti_db} db</td>
                                </tr>
                    </table>

                    <table className="admin_ov_table">
                        <tr>
                             <th>Kölcsönzés alatt álló modellek:</th>
                        </tr>
                                <tr>
                                    
                                    <td>{kolcsonzott_modellek}</td>

                                </tr>
                    </table>
            </div>



        </div>
            
        </div>
    )
}

export default AdminDashboard

 