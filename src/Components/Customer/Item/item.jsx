import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "../Item/item.css"
import axios from 'axios';
import io from "socket.io-client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const item = () => {

    const location = useLocation();
    const token = localStorage.getItem("token")

    const id = location.state;

    const [items , setItems] = useState([]);
    const [clickBookmark , setClickBookmark] = useState("Add Bookmark")
    

    useEffect(() => {
        axios.get(`http://localhost:8080/item/${id}`, {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((response) => {
                setItems(response.data.message)
                // console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },[])



    const BookMark = async (Itemid) => {
        console.log(Itemid)
        axios.post("http://localhost:8080/bookmark", { Itemid, Itemid }, {
            headers: { Authorization: `${token}` }
        })
            .then((response) => {
                if(response.status === 200){
                    setClickBookmark(response.data.show)
                    alert(response.data.message);
                    // console.log(response.data)
                }
                else{
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                alert("Internal Server error")
                console.log(error)
            })
    }

    
    const socket = (itemId) => {
        const socketIo = io("http://localhost:8080")
        
        socketIo.emit("request" , {
            token : token,
            itemId : itemId 
        })
        // socketIo.emit("itemId" , itemId)
    }

    return (
        <div className='item-main'>
            <div className="item-container">
                <div className="image">
                    <img src={items.image} alt="item_img" />
                </div>
                <div className="description">
                    <div className="up">

                        <p className='para name'>{items.itemName}</p>
                        <p className='para price'>₹ {items.price}</p>
                    </div>
                    <div className="down">
                        <p className='para category'>{items.category}</p>
                        <p className='para desc'>{items.description}</p>
                    </div>
                </div>
                <div className="buy">
                    <button onClick={() => BookMark(items._id)}>{clickBookmark}</button>
                    <button onClick={() => socket(items._id)}>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default item
