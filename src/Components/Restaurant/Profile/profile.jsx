import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import "../Profile/profile.css"
import { useNavigate } from 'react-router-dom'



const profile = () => {

  const navigate = useNavigate()

  const socket = io("https://foody.atulgupta.tech")

  const [userDetails, setUserDetails] = useState([]);


  useEffect(() => {
    socket.on("request", (data) => {
      const { address } = data;
      setUserDetails(address)
    })
  }, [])


  const accept = () => {
    socket.emit("accept", "accepted")
  }

  const reject = () => {
    socket.emit("reject", "rejected")
  }

  console.log(userDetails)

  const restaurant = () => {
    navigate("/addRestaurant")
  }

  const menu = () => {
    navigate("/addmenu")
  }


  return (
    <div className='res-pro'>
      <h1>Restaurant profile</h1>
      <div className="up">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
      </div>
      <div className="middle">

        <span onClick={restaurant}>Add restaurant</span>
        <span onClick={menu}>Add menu</span>
      </div>

      {userDetails.length > 0 && (
        <div className="mark">
          <p>Deliver to {userDetails}</p>
          <button className='green' onClick={() => accept()}>Accept</button>
          <button className='white' onClick={() => reject()}>Cancel</button>
        </div>
      )}

    </div>
  )
}

export default profile
