import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import "../Menu/menu.css"


const menu = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const [items, setItems] = useState([])
    const { restaurant } = location.state || {};

    useEffect(() => {
        axios.get("http://localhost:8080/menu", { params: { ids: restaurant.menu }  , headers: { 'Authorization': `${localStorage.getItem("token")}` } })
            .then((Response) => {
                console.log(Response.data.message)
                // const items = Response.data.message;
                setItems(Response.data.message)
            })
            .catch((err) => {
                console.log(err)
                alert("Something went wrong")
            })
    }, [])

    const handleItem = (item) => {
        navigate("/item", { state: { item } })
    }

    return (
        <div className='menu'>
            <h1>menu</h1>
            <div className="menu-container">
                {items.map((item) => (
                    <div className="menu-items" key={item._id} onClick={() => (handleItem(item))}>
                        <img src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg" alt="" />
                        <div className="menu-description">
                            <p>{item.itemName}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <div className="description">
                                <p>{item.description}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default menu