import React, { useEffect, useState } from 'react'
import "../Items/items.css"
import { useLocation } from 'react-router-dom'
import axios from "axios"

const items = () => {

    const location = useLocation()
    const token = localStorage.getItem("token")
    const restaurantId = location.state;

    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/menu", {
            params: { ids: restaurantId }, headers: {
                "Authorization": `${token}`
            }
        })
            .then((response) => {
                // console.log(response.data.message)
                setItems(response.data.message)
            })
            .catch((err) => {
                console.log("Something went wrong")
                console.log(err)
            })
    }, [])

    return (
        <div className='menu'>
            <h1>menu</h1>
            <div className="menu-container">
                {items.map((item) => (
                    <div className="menu-items" key={item._id}>
                        <img src={item.image} alt="" />
                        <div className="menu-description" >
                            <p>{item.itemName}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default items
