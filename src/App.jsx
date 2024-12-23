import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

// import Register from './Components/Customer/Register/register'
// import Login from './Components/Customer/Login/login'
// import Home from "./Components/Customer/Home/home"
// import Menu from './Components/Customer/Menu/menu'
// import ForgetPassword from './Components/Customer/ForgetPassword/forgetPassword'

const Register = React.lazy(() => import('./Components/Customer/Register/register'));
const Login = React.lazy(() => import('./Components/Customer/Login/login'));
const Home = React.lazy(() => import('./Components/Customer/Home/home'));
const Menu = React.lazy(() => import('./Components/Customer/Menu/menu'));
const ForgetPassword = React.lazy(() => import('./Components/Customer/ForgetPassword/forgetPassword'));
const Item = React.lazy(() => import('./Components/Customer/Item/item'))


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Register />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<Home />} path='/home' />
          <Route element={<Menu />} path='/menu' />
          <Route element={<ForgetPassword />} path="/password/reset" />
          <Route element={<Item />} path='/item' />
        </Routes>
      </Router>
    </>
  )
}

export default App