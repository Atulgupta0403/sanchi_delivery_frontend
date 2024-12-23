import React, { useState } from 'react'
import axios from 'axios'
import "../ForgetPassword/forgetPassword.css"

const forgetPassword = () => {

    const [email , setEmail] = useState({
        email : ""
    })

    const handleInput = (event) => {
        const {value , name} = event.target;
        setEmail({...email , [name] : value})
    }

    const handleForgetPassword = (event) =>{
        event.preventDefault()
        axios.post("http://localhost:8080/password/reset" , email)
        .then((Response) => {
            console.log(Response.data)
            alert(Response.data.message)
        })
        .catch((err) => {
            console.log(err)
            alert("Something went wrong")
        })
        // event.target.elements[0].value = ""
        console.log(event.target.elements[0])
    }



    return (
        <div className='forget-main'>
            <div className="forget-container">
                <form onSubmit={handleForgetPassword}>
                    <input type="email" placeholder='Enter your email' name='email' onChange={handleInput}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default forgetPassword
