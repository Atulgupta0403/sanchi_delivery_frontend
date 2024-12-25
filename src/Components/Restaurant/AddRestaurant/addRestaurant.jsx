import React, { useState } from 'react'
import "../AddRestaurant/addRestaurant.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const addRestaurant = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [formData , setFormData] = useState({
        restaurantName : "",
        location : "",
        cuisine : "",
        image : ""
    })

    const inputHandle = (event) => {
        const {name , value} = event.target;
        setFormData({ ...formData , [name] : value })
    }

    const addRestaurantHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/restaurant", formData, {
            headers: { "Authorization": `${token}` }
        })
        .then((response) => {
            if(response.data.status === 200){
                alert(response.data.message)
                navigate("/addMenu")
            }
            else{
                alert(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error)
            alert("Something went wrong")
        })
    }

  return (
    <div className='rest'>
        <h2>Restaurant Details</h2>
        <div className="rest-container">
            <form onSubmit={addRestaurantHandler}>
                <input type="text" placeholder='Restaurant Name' name='restaurantName' onChange={inputHandle}/>
                <input type="text" placeholder='Restaurant Location' name='location' onChange={inputHandle} />
                <input type="text" placeholder='Restaurant Cuisine' name='cuisine' onChange={inputHandle}/>
                <input type="text" placeholder='Restaurant Image Url' name='image' onChange={inputHandle}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default addRestaurant
