import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

// import Register from './Components/Customer/Register/register'
// import Login from './Components/Customer/Login/login'
// import Home from "./Components/Customer/Home/home"
// import Menu from './Components/Customer/Menu/menu'
// import ForgetPassword from './Components/Customer/ForgetPassword/forgetPassword'

const First = React.lazy(() => import("./Components/Customer/First/first"))
const Register = React.lazy(() => import('./Components/Customer/Register/register'));
const Login = React.lazy(() => import('./Components/Customer/Login/login'));
const Home = React.lazy(() => import('./Components/Customer/Home/home'));
const Menu = React.lazy(() => import('./Components/Customer/Menu/menu'));
const ForgetPassword = React.lazy(() => import('./Components/Customer/ForgetPassword/forgetPassword'));
const Item = React.lazy(() => import('./Components/Customer/Item/item'))
const LiveTracking = React.lazy(() => import("./Components/Customer/LiveTracking/liveTracking"))
const Profile = React.lazy(() => import("./Components/Customer/Profile/profile"))

const AddRestaurant = React.lazy(() => import("./Components/Restaurant/AddRestaurant/addRestaurant"))
const AddMenu = React.lazy(() => import("./Components/Restaurant/AddMenu/addMenu"))
const RestaurantProfile = React.lazy(() => import("./Components/Restaurant/Profile/profile"))

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<First />} path='/' />
          <Route element={<Register />} path='/register' />
          <Route element={<Login />} path='/login' />
          <Route element={<Home />} path='/home' />
          <Route element={<Menu />} path='/menu' />
          <Route element={<ForgetPassword />} path="/password/reset" />
          <Route element={<Item />} path='/item' />
          <Route element={<LiveTracking />} path='/liveTracking' />
          <Route element={<Profile />} path='/profile' />

          <Route element={<AddRestaurant />} path='/addRestaurant' />
          <Route element={<AddMenu />} path='/addMenu' />
          <Route element={<RestaurantProfile />} path='/restaurantProfile' />

        </Routes>
      </Router>
    </>
  )
}

export default App