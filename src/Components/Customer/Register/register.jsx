import React, { useState } from 'react'
import "../Register/register.css"
import axios from "axios"

const register = () => {

    const [formData , setFormData] = useState({
        username : "",
        email : "",
        password : "",
        address : ""
    })

    const handleInputChange = (event) => {
        const {name , value} = event.target;
        setFormData({...formData , [name] : value});
    }


    const registerHandler = (event) => {
        event.preventDefault()
        axios.post("https://foody.atulgupta.tech/signup" , formData)
            .then((response) => {
                console.log(response.data)
                alert(response.data.message)
                window.location.href = "/login"
            })
            .catch((err) => {
                console.error("Error during registration:", err);
                alert("Failed to register. Please try again.");
            })
    }

    return (
        <div className="register-container">
            <div className='Register'>
                <form action="/signup" method="post" onSubmit={registerHandler}>
                    <input type="text" placeholder='Username' name='username' value={formData.username} onChange={handleInputChange} />
                    <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleInputChange}/>
                    <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInputChange}/>
                    <input type="text" placeholder='Address' name='address' value={formData.address} onChange={handleInputChange}/>
                    <button type='submit'>SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default register
