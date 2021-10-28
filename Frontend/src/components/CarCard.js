import React from 'react'
import { Link } from 'react-router-dom'

const CarCard = (props) => {

    /// key={props.id}      {props.car_name}    {props.picture}  

  




  return (
        <div className="car_card" style={{
          backgroundImage: `url(${props.picture})`
        }}>

        <h1>{props.car_name}</h1>



        <div className="car_card_button">
             <Link to={`/modelljeink/${props.id}`}><button className="primary_button">Részletek ⯈</button></Link>
        </div>
       
      </div>
  )
}

export default CarCard
