import React, { useState } from 'react'
import "../AddRestaurant/addRestaurant.css"
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'


const addRestaurant = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [formData, setFormData] = useState({
        restaurantName: "",
        cuisine: "",
        image: "",
        location: "",
    })

    const inputHandle = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const addRestaurantHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/restaurant", formData, {
            headers: { "Authorization": `${token}` }
        })
            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    console.log("if")
                    alert(response.data.message)
                    navigate("/addMenu")
                }
                else {
                    console.log("else")
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
                alert("Something went wrong")
            })
    }


    const [suggestions , setSuggestions] = useState([]);

    const fetchSuggestion = async (input) => {
        const response = await axios.get(`https://foody.atulgupta.tech/getSuggestion/${input}`)
        setSuggestions(response.data)    
    }

    const handleAddressChange = (event) => {
        console.log(event)
        inputHandle(event)
        const query = event.target.value;
        if (query.length > 0) {
            fetchSuggestion(query);
        } else {
            setSuggestions([]);
        }
    }


    console.log(formData)

    return (
        <div className='rest'>
            <h1>Restaurant Details</h1>
            <div className="rest-container">
                <form onSubmit={addRestaurantHandler}>
                    <input type="text" placeholder='Restaurant Name' name='restaurantName' onChange={inputHandle} />
                    <input type="text" placeholder='Restaurant Cuisine' name='cuisine' onChange={inputHandle} />
                    <input type="text" placeholder='Restaurant Image Url' name='image' onChange={inputHandle} />
                    <input type="text" placeholder='Restaurant Location' value={formData.location} name='location' onChange={(e) => { inputHandle(e) ; handleAddressChange(e); }} />
                    {/* {suggestions.message?.length > 0 && (
                        <div className="suggestions" >
                            {suggestions.message.map((suggestion, index) => (
                                <span key={index} className="suggestion-item" onClick={() => {setFormData({ ...formData, location: suggestion }) ; setSuggestions([])}}>{suggestion}</span>
                            ))}
                        </div>
                    )} */}
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="rest-menu">
                <span>Already have an Restaurant?</span>
                <Link to="/addMenu">Add menu</Link>
            </div>
        </div>
    )
}

export default addRestaurant
