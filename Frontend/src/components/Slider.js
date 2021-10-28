  import React from 'react';
  import CarAd2 from './imgs/Car_ad2.png';
  import CarAd3 from './imgs/car_ad3.png';
  import CarAd4 from './imgs/car_ad4.png';

  

  import ImageGallery from 'react-image-gallery';




  const Slider = () => {


const images = [

  {
    original: CarAd2,
    
  },


  {
    original: CarAd3,
    
  },


  {
    original: CarAd4,
 
  },
];

    return (
        <div className="slider">
        <ImageGallery items={images}
         showBullets={true} 
         showFullscreenButton={false} 
         showThumbnails={false}
         autoPlay={true} 
         showPlayButton={false}
         slideDuration={400} 
         slideInterval={6000}
         showNav={true}
         infinite={true}

         
         
         />
         </div>
      
    )
  };
  export default Slider;