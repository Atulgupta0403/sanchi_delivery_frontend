import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../Home/home.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'

const home = () => {
    const location = useLocation()
    const navigate = useNavigate();


    const [restaurants, setRestaurants] = useState([]);
    const { authHeader } = location.state || "";

    console.log("token = " + authHeader)

    useEffect(() => {
        axios.get("https://foody.atulgupta.tech/restaurant", {
            headers: {
                'Authorization': authHeader
            }
        })
            .then((response) => {
                console.log(response.data)
                if(response.data.message === "UnAuthorized"){
                    window.location.href = "/login"
                }
                setRestaurants(response.data.message)
            })
            .catch((err) => {
                console.error(err);
                alert("Something went wrong");
            });
    }, []);

    const handleClick = (restaurant) => {
        navigate('/menu', { state: { restaurant } });
    };

    console.log(restaurants)


    return (
        <div className='home-container'>
            <div className="home">
                <h1>RESTAURANTS</h1>
                <div className="home-restaurant">
                    {restaurants.map((restaurant) => {
                        return <div className="home-items" key={restaurant._id} onClick={() => (handleClick(restaurant))}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9oBl8oMj8unCKsHx9WuzVKgxc34HJnei-Qw&s" alt="" />
                            <h3>{restaurant.restaurantName}</h3>
                            <p>Location: {restaurant.location}</p>
                            <p>Cuisine: {restaurant.cuisine}</p>
                            <p>Rating: {restaurant.rating}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default home
