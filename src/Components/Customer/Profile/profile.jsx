import React, { useState } from 'react'
import "../Profile/profile.css"
import axios from 'axios'
import { Navigate, useNavigate} from 'react-router-dom'

const profile = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [bookmarks, setBookmarks] = useState([])
    const [order, setOrder] = useState([])
    const [clickBookmark , setClickBookmark] = useState(true)
    const [clickOrder , setClickOrder] = useState(true)
    const [id , setId] = useState("");


    const item = (id) => {
        console.log(id)
        navigate("/item" , {state : id})
    }


    const bookmark = () => {
        axios.get("http://localhost:8080/bookmark", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                if (Response.status === 200 && clickBookmark === true) {
                    setBookmarks(Response.data)
                    setClickBookmark(false)
                    console.log(Response.data);
                }
                else if(clickBookmark === false) {
                    setBookmarks([])
                    setClickBookmark(true)
                }
                else{
                    alert(Response.data.message)
                    console.log("else  " , Response.data.message)

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const orders = () => {
        axios.get("http://localhost:8080/orders", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                if (Response.status === 200 && clickOrder === true) {
                    setOrder(Response.data)
                    setClickOrder(false)
                    console.log(Response.data);

                }
                else if(clickOrder === false){
                    setOrder([])
                    setClickOrder(true)
                }
                else {
                    alert(Response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteAccount = () => {
        axios.delete("http://localhost:8080/delete", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                console.log(Response.data)
                if(Response.status === 200){
                    // alert(Response.data.message)
                    navigate("/login")
                }
                else{
                    alert(Response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log(bookmarks)



    return (
        <div className='profile-main'>
            <div className="profile-up">
                <div className="image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" alt="" />
                </div>
                <p>atulgupta@gmail.com</p>
            </div>
            <hr />
            <div className="profile-middle">
                <p onClick={() => {bookmark()}}>Bookmarks</p>
                <hr />
                {bookmarks.message?.length > 0 && (
                    <div className="bookmarks">
                        {bookmarks.message.map((elem, index) => (
                            <div className="bookmark" key={index} onClick={() => item(elem._id)}>
                                <img src={elem.image} alt="" />
                                <p>{elem.itemName}</p>
                                <p>{elem.category}</p>
                                <p>₹{elem.price}</p>
                            </div>
                        ))}
                    </div>
                )}
                <p onClick={orders}>Orders</p>
                <hr />
                {order.message?.length > 0 && (
                    <div className="orders">
                        {order.message.map((elem, index) => (
                            <div className="order" key={index}>{elem}</div>
                        ))}
                    </div>
                )}
                <p>Liked Dish</p>
                <hr />
            </div>
            <hr />
            <div className="profile-down">
                <p>Logout</p>
                <p onClick={deleteAccount}>Delete Account</p>
            </div>

        </div>
    )
}

export default profile
