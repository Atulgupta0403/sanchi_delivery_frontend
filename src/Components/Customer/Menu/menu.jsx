import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom';
import "../Menu/menu.css"


const menu = (props) => {

    const [items, setItems] = useState([])
    const location = useLocation();
    const { restaurant } = location.state || {};

    useEffect(() => {
        axios.get("https://foody.atulgupta.tech/menu", { params: { ids: restaurant.menu } })
            .then((Response) => {
                // console.log(Response.data.message)
                // const items = Response.data.message;
                setItems(Response.data.message)
            })
            .catch((err) => {
                console.log(err)
                alert("Something went wrong")
            })
    }, [])

    items.map((item) => {
        console.log(item)
    })

    // console.log(restaurant.menu[0])


    return (
        <div className='menu'>
            <h1>menu</h1>
            <div className="menu-container">
                {items.map((item) => (
                    <div className="menu-items">
                        <img src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg" alt="" />
                        <p>{item.description}</p>
                        <p>{item.itemName}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default menu