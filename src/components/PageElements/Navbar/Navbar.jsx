import './Navbar.css'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import logo from "../../../assets/7.jpg"
function Navbar() {
    let navigate = useNavigate()
    const { user, signOut } = useContext(UserContext)
    return (
        <header>
            <div id='lhs_navbar'>
                <div className='logo' onClick={()=>{navigate("")}}>
                    <img src={logo} alt='logo image' />
                </div>
            </div>
            <div id='rhs_navbar'>

                <div>
                    {user ? (
                        <>
                            <div onClick={() => { navigate(`/user/${user.id}`) }}>
                                <i className='fa fa-user-circle fa-2x' aria-hidden="true" ></i>
                            </div>

                        </>
                    ) : (
                        <div id='signed-out-options'>
                            <Link to='/auth/register'>
                                Sign Up
                            </Link>
                            <Link to='/auth/login'>
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>

        </header>

    )
}

export default Navbar