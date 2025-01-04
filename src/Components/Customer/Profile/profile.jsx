import React, { useEffect, useState } from 'react'
import "../Profile/profile.css"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const profile = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [bookmarks, setBookmarks] = useState([])
    const [order, setOrder] = useState([])
    const [clickBookmark, setClickBookmark] = useState(true)
    const [clickOrder, setClickOrder] = useState(true)


    const [profileDetail, setProfileDetail] = useState()
    

    useEffect(() => {
        axios.get("https://foody.atulgupta.tech/profile" , {headers : {
            "Authorization" : `${token}`
        }})
        .then((Response) => {
            console.log(Response)
            setProfileDetail(Response.data.message)
            // console.log(Response.data)
        })
        .catch((error) => {
            console.log(error)
            alert("Something went wrong")
        })
    },[])

    // console.log("profileDetail  " , profileDetail?.email)
    // if(profileDetail)
    

    const item = (id) => {
        // console.log(id)
        navigate("/item", { state: id })
    }


    const bookmark = () => {
        axios.get("https://foody.atulgupta.tech/bookmark", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                if (Response.status === 200 && clickBookmark === true) {
                    setBookmarks(Response.data)
                    setClickBookmark(false)
                    console.log("if");
                }
                else if (clickBookmark === false) {
                    console.log("else if")
                    setBookmarks([])
                    setClickBookmark(true)
                }
                else {
                    alert(Response.data.message)
                    
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // console.log(bookmarks)


    const orders = () => {
        axios.get("https://foody.atulgupta.tech/orders", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                if (Response.status === 200 && clickOrder === true) {
                    setOrder(Response.data)
                    setClickOrder(false)
                    // console.log(Response.data);

                }
                else if (clickOrder === false) {
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
        axios.delete("https://foody.atulgupta.tech/delete", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                console.log(Response.data)
                if (Response.status === 200) {
                    // alert(Response.data.message)
                    navigate("/login")
                }
                else {
                    alert(Response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    


    return (
        <div className='profile-main'>
            <div className="profile-up">
                <div className="image">
                    <img src={profileDetail?.profileImage} alt="" />
                </div>
                <p>{profileDetail?.email}</p>
            </div>
            <hr />
            <div className="profile-middle">
                <p onClick={() => { bookmark() }}>Bookmarks</p>
                <hr />
                {bookmarks.message?.length > 0 && (
                    <div className="bookmarks">
                        {bookmarks.message?.map((elem, index) => (
                            <div className="bookmark" key={index} onClick={() => item(elem._id)}>
                                <img src={elem?.image} alt="" />
                                <p>{elem?.itemName}</p>
                                <p>{elem?.category}</p>
                                <p>₹{elem?.price}</p>
                            </div>
                        )) || <h1>hello</h1>}
                    </div>
                )}
                <p onClick={orders}>Orders</p>
                <hr />
                {order.message?.length > 0 && (
                    <div className="bookmarks">
                        {order.message.map((elem, index) => (
                            <div className="bookmark" key={index} onClick={() => item(elem._id)}>
                                <img src={elem?.image} alt="" />
                                <p>{elem?.itemName}</p>
                                <p>{elem?.category}</p>
                                <p>₹{elem?.price}</p>
                            </div>
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
