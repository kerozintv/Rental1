import React from 'react'


const GiftShopItem = (props) => {
  return (
    <div key={props.id} className="giftshop_item">
      <h2>{props.name}</h2>
      <img className="item_picture" src={props.picture} alt="" />
      <h2>Ár: {props.price} hűségpont</h2>
      <h2>Raktáron: {props.remaining}</h2>
      <button onClick={props.action} className="redeem_button">Beváltom</button>
    </div>
  )
}

export default GiftShopItem
