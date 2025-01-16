import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import "../Profile/profile.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const profile = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  
  const [userDetails, setUserDetails] = useState([]);
  const [restaurantDetails , setRestaurantDetails] = useState([])

  const socket = io("http://localhost:8080/")
  socket.on("request", (data) => {
    setUserDetails(data)
  })


  useEffect(() => {
    axios.get("http://localhost:8080/restaurantProfile" , {headers : 
      {"Authorization" : `${token}`}
    }) 
    .then((response) => {
      console.log(response.data.message)
      setRestaurantDetails(response.data.message)
    })
    .catch((err) => {
      console.log("Something went wrong")
      console.log(err)
    })
  },[])


  const accept = () => {
    socket.emit("accept", "accepted")
    setUserDetails([])
  }

  const reject = () => {
    socket.emit("reject", "rejected")
    setUserDetails([])
  }

  const restaurant = () => {
    navigate("/addRestaurant")
  }

  const menu = () => {
    navigate("/addmenu")
  }

  const items = (restaurantId) => {
    navigate("/items" , { state : restaurantId})
  }

  // console.log(userDetails)

  return (
    <div className='res-pro'>
      <h1>{restaurantDetails?.restaurantName? restaurantDetails.restaurantName : "restaurantName"} </h1>
      <div className="up">
        <img src={restaurantDetails?.image} alt="" />
      </div>
      <p>{restaurantDetails?.cuisine}</p>
      <div className="middle">

        <span onClick={restaurant}>Add restaurant</span>
        <span onClick={menu}>Add menu</span>
        <span onClick={() => (items(restaurantDetails._id))}>All Items</span>
      </div>

      {userDetails.address !== undefined && (
        <div className="mark">
          <p>Order For</p>
          <div className="menu-items">
            <img src={userDetails.item.image} alt="" />
            <div className="menu-description" >
              <p>{userDetails.item.itemName}</p>
              <p>{userDetails.item.category}</p>
              <p>₹{userDetails.item.price}</p>
            </div>
          </div>

          <p>Deliver to {userDetails.address}</p>
          {/* <p>Deliver to {userDetails.item.itemName}</p> */}
          <button className='green' onClick={() => accept()}>Accept</button>
          <button className='white' onClick={() => reject()}>Cancel</button>
        </div>
      )}

    </div>
  )
}

export default profile
