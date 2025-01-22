import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "../Item/item.css"
import axios from 'axios';
import io from "socket.io-client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Navbar from '../Navbar/navbar';


const item = () => {

    // const {addToCart} = useContext(CartContext);

    const location = useLocation();
    const token = localStorage.getItem("token")

    const id = location.state;

    const [items, setItems] = useState([]);
    const [clickBookmark, setClickBookmark] = useState("Add Bookmark")


    useEffect(() => {
        axios.get(`https://foody.atulgupta.tech/item/${id}`, {
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
    }, [])




    const BookMark = async (Itemid) => {
        console.log(Itemid)
        axios.post("https://foody.atulgupta.tech/bookmark", { Itemid, Itemid }, {
            headers: { Authorization: `${token}` }
        })
            .then((response) => {
                if (response.status === 200) {
                    setClickBookmark(response.data.show)
                    alert(response.data.message);
                    // console.log(response.data)
                }
                else {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                alert("Internal Server error")
                console.log(error)
            })
    }


    // const socketIo = io("https://foody.atulgupta.tech")
    // const socket = (itemId) => {
    //     socketIo.emit("request" , {
    //         token : token,
    //         itemId : itemId 
    //     })
    // }


    // socketIo.on("accept" , (data) => {
    //     // alert(data)
    //     if(data){
    //         console.log(data)
    //         alert("Your order has been accepted")

    //     }
    // })

    // socketIo.on("reject" , (data) => {
    //     // alert(data)
    //     if(data){
    //         console.log(data)
    //         alert("Your order has been cancelled")
    //     }
    // })

    const handleAddToCart = (itemId) => {
        console.log(itemId)
        axios.post("http://localhost:8080/addToCart", { itemId }, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {

                console.log(response)
                const length = response.data.message.length;
                localStorage.setItem("cartItem", length)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const like = (itemId) => {
        axios.post("http://localhost:8080/like" , {itemId} , {headers : {
            Authorization : `${token}`
        }})
        .then((response) => {
            console.log(response.data.message)
        })
        .catch((error) => {
            console.log("Something went wrong")
            console.log(error)
        })
    }


    return (
        <div className='item-main'>
            <Navbar />
            <div className="item-container">
                <div className="image">
                    <img src={items.image} alt="item_img" />
                    <div className="like" onClick={() => like(items._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" fill='white' /></svg>
                    </div>
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
                    <button onClick={() => handleAddToCart(items._id)}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default item
