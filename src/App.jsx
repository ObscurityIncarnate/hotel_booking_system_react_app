import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Navbar from './components/PageElements/Navbar/Navbar'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import Payment from './components/Pages/Payment/Payment'
import Homepage from './components/Pages/Homepage/Homepage'
import Footer from './components/PageElements/Footer/Footer'
import BranchRooms from './components/Pages/BranchRooms/BranchRooms'
import RoomDetail from './components/Pages/RoomDetail/RoomDetail'
function App() {

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/auth/register' element={<Register/>}></Route>
          <Route path='/payment' element={<Payment/>}></Route>
          <Route path='' element={<Homepage/>}></Route>
          <Route path='/branches/:branchId/rooms' element={<BranchRooms/>}></Route>
          <Route path='/branches/:branchId/rooms/:roomId' element={<RoomDetail/>}></Route>
        </Routes>
        {/* <ToastContainer/> */}
      </main>
      <Footer></Footer>

    </>
  )
}

export default App
