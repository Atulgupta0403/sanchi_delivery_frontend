import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import Register from './Components/Customer/Register/register'
import Login from './Components/Customer/Login/login'
import Home from "./Components/Customer/Home/home"
import Menu from './Components/Customer/Menu/menu'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Register />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<Home />} path='/home' />
          <Route element={<Menu />} path='/menu' />
        </Routes>
      </Router>
    </>
  )
}

export default App