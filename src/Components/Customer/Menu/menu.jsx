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
        axios.get("https://foody.atulgupta.tech/menu", { params: { ids: restaurant.menu }  , headers: { 'Authorization': `${localStorage.getItem("token")}` } })
            .then((Response) => {
                // console.log(Response.data.message)
                setItems(Response.data.message)
            })
            .catch((err) => {
                console.log(err)
                alert("Something went wrong")
            })
    }, [])

    const handleItem = (id) => {
        console.log(id)
        navigate("/item", { state: id })
    }

    return (
        <div className='menu'>
            <h1>menu</h1>
            <div className="menu-container">
                {items.map((item) => (
                    <div className="menu-items" key={item._id} onClick={() => (handleItem(item._id))}>
                        <img src={item.image} alt="" />
                        <div className="menu-description" >
                            <p>{item.itemName}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default menu