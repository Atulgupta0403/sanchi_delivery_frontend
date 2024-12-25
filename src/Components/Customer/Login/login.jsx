import React, { useState } from 'react'
import "../Login/login.css"
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'

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
        axios.post("http://localhost:8080/login" , formData) 
        .then((Response) => {
            if(Response.status === 200){
                const token = Response.data.message;
                console.log(Response.data)
                localStorage.setItem("token" , token);
                if(Response.data.accountType === "Restaurant-owner"){
                    navigate("/addRestaurant")
                }
                else{
                    navigate("/home")
                }
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

            <div className="login-register">
                <span>Don't have an account?</span>
                <Link to="/register">SignUp</Link>
            </div>
        </div>
    )
}

export default login
