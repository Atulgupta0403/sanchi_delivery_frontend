import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "../Cart/cart.css"
import Navbar from '../Navbar/navbar'

const cart = () => {

  const token = localStorage.getItem("token")

  const [items, setItems] = useState([])
  const [trigger , setTrigger] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:8080/Cart", {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((response) => {
        localStorage.setItem("cartItem" , items.length)
        setItems(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [trigger])

  const deleteCartItem = (itemId) => {
    axios.delete(`http://localhost:8080/deleteCartItem/${itemId}`, {headers: {
        "Authorization": `${token}`
      }
    })
    .then((response) => {
      console.log(response.data)
      setTrigger(true)
      alert(response.data.message)
      setItems(response.data.cartItems)
    })
    .catch((error) => {
      console.log("Something went wrong")
      console.log(error)
    })
  }

  console.log(items)

  return (
    <div className='menu'>
      <Navbar />
      <h1>Cart</h1>
      <div className="menu-container">
        {items.map((item) => (
          <div className="cart-items">
            <img src={item.image} alt="" />
            <div className="menu-description">
              <p>{item.itemName}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
            </div>
            <div className="delete" onClick={() => deleteCartItem(item._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" fill='#ff4d6d'/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default cart

