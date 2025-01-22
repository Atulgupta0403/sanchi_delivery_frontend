import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "../Cart/cart.css"
import Navbar from '../Navbar/navbar'

const cart = () => {

  const token = localStorage.getItem("token")

  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/Cart", {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((response) => {
        // console.log(response)
        setItems(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='menu'>
      <Navbar />
      <h1>Cart</h1>
      <div className="menu-container">
        {items.map((item) => (
          <div className="menu-items" key={item._id} onClick={() => (handleItem(item._id))}>
            <img src={item.image} alt="" />
            <div className="menu-description">
              <p>{item.itemName}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default cart

