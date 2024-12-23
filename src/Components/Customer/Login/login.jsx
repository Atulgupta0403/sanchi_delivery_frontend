import React, { useState } from 'react'
import "../Login/login.css"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const login = () => {

    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {value , name} = event.target;
        setFormData({...formData , [name] : value})
    }

    const loginHandler = (event) => {
        event.preventDefault();
        axios.post("https://foody.atulgupta.tech/login" , formData) 
        .then((Response) => {
            // console.log(Response.data)
            if(Response.status === 200){

                authToken(Response.data.message);
                window.location.href = "/home";
            }
            else{
                alert(Response.data.message)
            }
        })
        .catch((err) => {
            console.log(err)
            alert("failed to login")
        })
    }

    const authToken = (authHeader) => {
        navigate("/home" , {state : {authHeader}})
    }


    return (
        <div className='login-container'>
            <h1>Login</h1>
            <div className="login">
                <form action="/login" method="post" onSubmit={loginHandler}>
                    <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleInputChange}/>
                    <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInputChange}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default login
