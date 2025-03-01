import React, { useState } from 'react'
import "../Register/register.css"
import axios from "axios"
import { Link, useLocation } from 'react-router-dom'

const register = () => {

    const location = useLocation()
    const accountType = location.state;

    // console.log(accountType)


    const [formData , setFormData] = useState({
        username : "",
        email : "",
        password : "",
        address : "",
        accountType : accountType
    })

    const handleInputChange = (event) => {
        const {name , value} = event.target;
        setFormData({...formData , [name] : value});
    }


    const registerHandler = (event) => {
        event.preventDefault()
        axios.post("https://foody.atulgupta.tech/signup" , formData)
            .then((response) => {
                // console.log(response.status)
                if(response.status === 200){
                    alert(response.data.message)
                    window.location.href = "/login"
                }
                else{
                    alert(response.data.message)
                }
            })
            .catch((err) => {
                console.error("Error during registration:", err);
                alert("Failed to register. Please try again.");
            })
    }

    
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (input) => {
        try {
            const response = await axios.get(`https://foody.atulgupta.tech/getSuggestion/${input}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleAddressChange = (event) => {
        handleInputChange(event);
        const query = event.target.value;
        if (query.length > 0) {
            fetchSuggestions(query);
        } else {
            setSuggestions([]);
        }
    };

    // console.log(suggestions)

    // console.log(formData)


    return (
        <div className="register-container">
            <h1>SignUp as {accountType}</h1>
            <div className='Register'>
                <form action="/signup" method="post" onSubmit={registerHandler}>
                    <input type="text" placeholder='Username' name='username' value={formData.username} onChange={handleInputChange} />
                    <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleInputChange}/>
                    <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInputChange}/>
                    <input type="text" placeholder='Address' name='address' value={formData.address} onChange={(e) => { handleInputChange(e); handleAddressChange(e); }}/>
                    {suggestions.message?.length > 0 && (
                        <div className="suggestions" >
                            {suggestions.message.map((suggestion, index) => (
                                <span key={index} className="suggestion-item" onClick={() => {setFormData({ ...formData, address: suggestion}) ; setSuggestions([])}}>{suggestion}</span>
                            ))}
                        </div>
                    )}
                    <button type='submit'>SignUp</button>
                </form>
            </div>

            <div className="signup">
                <span>Already have an account?</span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default register
