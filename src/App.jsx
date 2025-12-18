import { useContext, useState } from 'react'
import { Routes, Route } from 'react-router'
import { UserContext } from './contexts/UserContext'
import './App.css'
import Navbar from './components/PageElements/Navbar/Navbar'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import Payment from './components/Pages/Payment/Payment'
import Homepage from './components/Pages/Homepage/Homepage'
import Footer from './components/PageElements/Footer/Footer'
import BranchRooms from './components/Pages/BranchRooms/BranchRooms'
import RoomDetail from './components/Pages/RoomDetail/RoomDetail'
import AccountDetails from './components/Pages/AccountDetails/AccountDetails'
import NotFound from './components/Pages/NotFound/NotFound'
import RoomCreate from './components/Pages/RoomCreate/RoomCreate'
import RoomUpdate from './components/Pages/RoomUpdate/RoomUpdate'
function App() {
  const { user, signOut } = useContext(UserContext)
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>

          <Route path='/payment' element={<Payment />}></Route>
          <Route path='' element={<Homepage />}></Route>
          <Route path='/branches/:branchId/rooms' element={<BranchRooms />}></Route>
          
          <Route path='/branches/:branchId/rooms/:roomId' element={<RoomDetail />}></Route>
          {user ?
            <Route path='/user/:userId' element={<AccountDetails />}></Route>
            : <>
              <Route path='/auth/login' element={<Login />}></Route>
              <Route path='/auth/register' element={<Register />}></Route>

            </>}
            {user &&user.is_staff?
              <>
                <Route path='/branches/:branchId/room/create' element={<RoomCreate/>}></Route>
                <Route path='/branches/:branchId/room/:roomId/edit' element={<RoomUpdate/>}></Route>              
              </>
            : null}
          <Route path='*' element={<NotFound />}></Route>            
        </Routes>

        {/* <ToastContainer/> */}
      </main>
      <Footer></Footer>

    </>
  )
}

export default App
