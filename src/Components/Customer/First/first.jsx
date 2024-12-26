import React from 'react'
import "../First/first.css"
import { Navigate, useNavigate , Link} from 'react-router-dom'


const first = () => {

    const navigate = useNavigate();

    return (
        <div className="first-container">

            <h1>SignUp as ...</h1>
            <div className='first'>
                <h2 onClick={() => (navigate("/register" , {state : "User"}))}>User</h2>
                <h2 onClick={() => (navigate("/register" , {state : "Restaurant-owner"}))}>Restaurant Owner</h2>
                <h2 onClick={() => (navigate("/register" , {state : "Delivery-Partner"}))}>Delivery partner</h2>
            </div>

            <div className="first-login">
                <span>Already have an account?</span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default first
