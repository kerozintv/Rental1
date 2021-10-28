import React from 'react'
import { useHistory, } from 'react-router-dom'
import  {useState, useEffect } from 'react'
import axios from 'axios'

const CarCardExpand = ({ match }) => {

  let history = useHistory();

      useEffect(() => {
          fetchData();

      }, []);
 

    const [loading, setLoading] = useState(true);

    const [carInfo, setCarInfo] = useState([]);

    const fetchData = async() => {
          const car_data = await axios.get(`/api/modelljeink/${match.params.id}`);
          const car_info = await car_data.data.car_info;
          setCarInfo(car_info);
          setLoading(false);

    };


    var content = '';

    if(loading === true) {

      content = (
                <div class="loader"></div>
                );


    } else {

         content = "";


    }












  return (
    <div className="car_card_expand" style={{
          backgroundImage: `url(${carInfo.car_picture})`
        }}>
      <button className="back_button" onClick={history.goBack}>
        🡄
      </button>

          {content}
        

       <h1>{carInfo.car_name}</h1>
      

        <div className="description_details">
        <p className="description">{carInfo.car_description}</p>
        <p className="car_price">Kaució: {carInfo.car_down_payment} Ft</p>
        <p className="car_price">Ár / nap: {carInfo.car_price} Ft</p>

        </div>




      
    </div>
  )
}

export default CarCardExpand
