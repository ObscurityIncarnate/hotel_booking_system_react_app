import './Login.css'
import { signInService } from '../../../services/auth'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
function Login() {
    const [errorData, setErrorData] = useState({})
    const [formData, setFormData] = useState({
        password: "",
        username: ""
    })
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await signInService(formData)
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
        <>
            <div className='form-box'>
                <form onSubmit={handleSubmit} className='form'>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' onChange={handleChange} />
                    {errorData["username"] ? <p className='errorMessage'>{errorData["username"]}</p> : null}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} />
                    {errorData["password"] ? <p className='errorMessage'>{errorData["password"]}</p> : null}
                    <button type="submit">Login</button>

                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login