import './Register.css'

import { signUpService } from '../../../services/auth'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router'
function Register() {
    const [errorData, setErrorData] = useState({})
    const [formData, setFormData] = useState({
        password: "",
        username: "",
        confirm_password: "",
        email: ""
    })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await signUpService(formData)
            navigate("/auth/login")
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
                    <h3>Register</h3>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' onChange={handleChange} required/>
                    {errorData["username"] ? <p className='errorMessage'>{errorData["username"]}</p> : null}

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange} required/>
                    {errorData["email"] ? <p className='errorMessage'>{errorData["email"]}</p> : null}

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                    {errorData["password"] ? <p className='errorMessage'>{errorData["password"]}</p> : null}

                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" name="confirm_password" onChange={handleChange}  required/>
                    {errorData["confirm_password"] ? <p className='errorMessage'>{errorData["confirm_password"]}</p> : null}

                    <button type="submit">Register</button>

                    {errorData["non_field_errors"] ?
                        <>
                            {Object.values(errorData["non_field_errors"]).map(error => <p className='errorMeessage'>{error}</p>)}
                        </> : null
                    }
                </form>
                <div className='design-box'>
                    <h1>
                        Welcome
                    </h1>
                    <p>Register an account with us, to get access to all the benefits</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register