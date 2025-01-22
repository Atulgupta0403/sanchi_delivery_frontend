import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../Home/home.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/navbar'

const home = () => {
    const location = useLocation()
    const navigate = useNavigate();


    const [restaurants, setRestaurants] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("https://foody.atulgupta.tech/restaurant", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((response) => {
                if (response.data.message === "UnAuthorized") {
                    navigate("/login");
                }
                setRestaurants(response.data.message)
            })
            .catch((err) => {
                console.error(err);
                alert("Something went wrong");
            });
    }, []);

    useEffect(() => {
        axios.get("https://foody.atulgupta.tech/profile" , {headers : {
            "Authorization" : `${token}`
        }})
        .then((Response) => {
            const length = Response?.data?.message?.cartItems?.length || 0;
            localStorage.setItem("cartItem" , length)
        })
        .catch((error) => {
            console.log(error)
            alert("Something went wrong")
        })
    },[])

    const handleClick = (restaurantId) => {
        navigate('/menu', { state: { restaurantId } });
    };

    return (
        <div className='home-container'>
            <Navbar />
            <div className="home">
                <h1>RESTAURANTS</h1>
                <div className="home-restaurant">
                    {restaurants.map((restaurant) => {
                        return <div className="home-items" key={restaurant._id} onClick={() => (handleClick(restaurant._id))}>
                            <img src={restaurant.image} alt="" />
                            <div className="home-details">
                                <div className="home-name">

                                    <h3>{restaurant.restaurantName}</h3>
                                    <p className='rating'>{restaurant.rating}</p>
                                </div>
                                <div className="location">

                                    <p>{restaurant.cuisine}</p>
                                    <p>{restaurant.location}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default home
