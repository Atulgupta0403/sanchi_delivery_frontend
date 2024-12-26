import React, { useState } from 'react'
import "../AddMenu/addMenu.css"
import axios from 'axios'

const addMenu = () => {

  const token = localStorage.getItem("token")

  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const inputHandle = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  const addMenuHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/menu", formData, {
      headers: {
        "Authorization": `${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          alert(response.data.message);
        }
        else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      })
  }

  return (
    <div className='menu'>
      <h1>Add menu</h1>
      <div className="menu-container">
        <form onSubmit={addMenuHandler}>
          <input type="text" placeholder='Item Name' name='itemName' onChange={inputHandle} />
          <input type="text" placeholder='Item Price' name='price' onChange={inputHandle}/>
          <input type="text" placeholder='Item description' name='description' onChange={inputHandle}/>
          <input type="text" placeholder='Item Category' name='category' onChange={inputHandle}/>
          <input type="text" placeholder='Item Image Url' name='image' onChange={inputHandle}/>
          <button type='Submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default addMenu
