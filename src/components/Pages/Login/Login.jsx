import './Login.css'
import { signInService } from '../../../services/auth'
import { useState, useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { getUserFromToken, setToken, getToken } from '../../../utils/token'
import { UserContext } from '../../../contexts/UserContext'
import { useNavigate } from 'react-router'
function Login() {

    const { setUser } = useContext(UserContext)
    const [errorData, setErrorData] = useState({})
    const [formData, setFormData] = useState({
        password: "",
        username: ""
    })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await signInService(formData)
            const token = response.data.access
            if (token) setToken(token)
            
            setUser(getUserFromToken())
            navigate("/")
        } catch (error) {
            if (error.response.status == 500) {
                toast("Something went wrong please try again")
            }
            toast(error.response.data?.detail)
            setErrorData(error.response.data)
        }

    }

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='auth-page'>
            <div className='form-box'>
                <form onSubmit={handleSubmit} className='form'>
                    <h3>Login</h3>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' onChange={handleChange} />
                    {errorData["username"] ? <p className='errorMessage'>{errorData["username"]}</p> : null}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} />
                    {errorData["password"] ? <p className='errorMessage'>{errorData["password"]}</p> : null}
                    <button type="submit">Login</button>

                </form>
                <div className='design-box'>
                    <h1>Welcome!</h1>
                    <p>Log in to view your bookings</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login