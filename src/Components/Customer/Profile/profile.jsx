import React, { useEffect, useState } from 'react'
import "../Profile/profile.css"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const profile = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [bookmarks, setBookmarks] = useState([])
    const [order, setOrder] = useState([])
    const [likeItem, setLikeItem] = useState([])
    const [clickBookmark, setClickBookmark] = useState(true)
    const [clickOrder, setClickOrder] = useState(true)
    const [clickLike, setClickLike] = useState(true)


    const [profileDetail, setProfileDetail] = useState()


    useEffect(() => {
        axios.get("https://foody.atulgupta.tech/profile", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((Response) => {
                console.log(Response)
                setProfileDetail(Response.data.message)
                console.log(Response.data)
            })
            .catch((error) => {
                console.log(error)
                alert("Something went wrong")
            })
    }, [])

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
                }
                else if (clickBookmark === false) {
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

    const like = () => {
        axios.get("http://localhost:8080/like", {
            headers: {
                "Authorization": `${token}`
            }
        })
            .then((response) => {
                if (response.status === 200 && clickLike === true) {
                    setLikeItem(response.data.message)
                    setClickLike(false)
                }
                else if (clickLike === false) {
                    setLikeItem([])
                    setClickLike(true)
                }
                else {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log("Something went wrong")
                console.log(error)
            })
    }

    console.log(likeItem)


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
                        ))}
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
                <p onClick={like}>Liked Dish</p>
                {likeItem?.length > 0 && (
                    <div className="bookmarks">
                        {likeItem.map((elem, index) => (
                            <div className="bookmark" key={index} onClick={() => item(elem._id)}>
                                <img src={elem?.image} alt="" />
                                <p>{elem?.itemName}</p>
                                <p>{elem?.category}</p>
                                <p>₹{elem?.price}</p>
                            </div>
                        ))}
                    </div>
                )}
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
