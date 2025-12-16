import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Navbar from './components/PageElements/Navbar/Navbar'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/auth/register' element={<Register/>}></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
        </Routes>
        {/* <ToastContainer/> */}
      </main>
    </>
  )
}

export default App
