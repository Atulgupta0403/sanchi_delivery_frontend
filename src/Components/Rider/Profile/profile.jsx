import React, { useEffect, useState } from 'react'
import "../Profile/profile.css"
import io from 'socket.io-client'

const profile = () => {

  const socket = io("https://foody.atulgupta.tech")
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    socket.on("request", (data) => {
      const { address } = data;
      console.log(address)
      setUserDetails(address);
    })
  }, [])


  const accept = () => {
    socket.emit("riderAccept" , "Rider Accepted")
    setUserDetails([])
  }
  
  const reject = () => {
    socket.emit("riderReject" , "Rider Rejected")
    setUserDetails([])
  }

  console.log(userDetails)

  return (
    <div className='rider-main'>
      <h1>Rider Profile</h1>
      <div className="up">
        <div className="image">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
        </div>
        <p>atulgupta@gmail.com</p>
      </div>
      <div className="middle">
      {userDetails.length > 0 && (
        <div className="mark">
          <p>Deliver to {userDetails}</p>
          <button className='green' onClick={() => accept()}>Accept</button>
          <button className='white' onClick={() => reject()}>Cancel</button>
        </div>
      )}
      </div>
    </div>
  )
}

export default profile
