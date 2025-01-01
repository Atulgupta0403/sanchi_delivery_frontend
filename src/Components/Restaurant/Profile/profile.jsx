import React, { useEffect } from 'react'
import io from "socket.io-client"



const profile = () => {
  // const socket = io("http://localhost:8080")

  // socket.on("request", (data) => {
  //     console.log(data);

  // });
  const socket = io("http://localhost:8080")


  useEffect(() => {
    socket.on("join", (data) => {
      // const { message, user } = data;
      // console.log(message)
      // console.log(user)
      console.log(data)
    })
  },[])


  return (
    <div>
      <h1>profile</h1>
    </div>
  )
}

export default profile
