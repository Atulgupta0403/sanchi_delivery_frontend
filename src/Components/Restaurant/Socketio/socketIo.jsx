import React, { useEffect } from 'react'
import io from "socket.io-client"

const socket = io("http://localhost:8080/")

const socketIo = () => {
  
  useEffect(()=> {
    socket.on("message" , (data) => {
      console.log(data)
    })
  } , [])


  return (
    <div>
      <h1>Socket io</h1>
    </div>
  )
}

export default socketIo
