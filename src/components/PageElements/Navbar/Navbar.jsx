import './Navbar.css'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
function Navbar() {
    let navigate = useNavigate()
    const { user, signOut } = useContext(UserContext)
    return (
        <header>
            <div id='lhs_navbar'>
                <div className="menu-button">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className='logo'>
                    <img src='/hotel_logo.jpg' alt='logo image' />
                </div>
            </div>
            <div id='rhs_navbar'>

                <div>
                    {user ? (
                        <>
                            <div onClick={()=>{navigate(`/user/${user.id}`)}}>
                                {/* <a href=""></a> */}
                                <i className='fa fa-user-circle' aria-hidden="true" ></i>
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