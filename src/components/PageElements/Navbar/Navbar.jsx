import './Navbar.css'
import { useNavigate } from 'react-router'
function Navbar(){
    let navigate = useNavigate()
    return (  
        <header>
            <div id='lhs_navbar'>
                <div className="menu-button">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className='logo'>
                    <img src='/hotel_logo.jpg' alt='logo image'/>
                </div>
            </div>
            <div id='rhs_navbar'>

                <div>
                    {false?(
                        <>
                            <div>
                                {/* <a href=""></a> */}
                                <i className='fa fa-user-circle' aria-hidden="true"></i>                  
                            </div>                              
                            <div>
                                Sign out
                            </div>                        
                        </>
                    ):(
                        <div id='signed-out-options'>
                            <a href='/auth/register'>
                                Sign Up
                            </a>
                            <a href='/auth/login'>
                                Sign In
                            </a>                    
                        </div>
                    )}
                </div>                      
            </div>

            {/* <a href=""></a>
            <a href=""></a>
            <a href=""></a> */}
         
        </header>

    )
}

export default Navbar