import React from 'react'
import { useLocation } from 'react-router-dom'
import "../Item/item.css"

const item = () => {

    const location = useLocation();
    const { item } = location.state;
    console.log(item)

    return (
        <div className='item-main'>
            <div className="item-container">
                <div className="image">
                    <img src="https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg" alt="" />
                </div>
                <div className="description">
                    <p>Name = {item.itemName}</p>
                    <p>price = {item.price}</p>
                    <p>category = {item.category}</p>
                    <p>description = {item.description}</p>

                </div>
                <div className="buy">
                    <button>Bookmark</button>
                    <button>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default item
