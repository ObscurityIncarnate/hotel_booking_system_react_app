import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { createBranchRoom } from "../../../services/branches"
import { toast, ToastContainer } from "react-toastify"

function RoomCreate() {
    const navigate = useNavigate()
    const { branchId } = useParams()
    const [formData, setFormData] = useState({})
    const [errorData, setErrorData] = useState({})
    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData)
            const response = await createBranchRoom(branchId, formData)
            navigate(`/branches/${branchId}/rooms`)
        } catch (error) {
            if (error.response.status) {
                toast("Something went wrong please try again later")
            }
            toast(error.response.data?.detail)
            setErrorData(error.response.data)
        }
    }
    return (
        <div className="body">
            <div className="form-box">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="price_per_night">Price per night</label>
                    <input type="text" inputMode="decimal"
                        id="float-input" name="price_per_night"
                        pattern="[0-9]*[.,]?[0-9]*" onChange={handleChange} required />
                    {errorData["price_per_night"] ? <p className='errorMessage'>{errorData["price_per_night"]}</p> : null}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="" onChange={handleChange} required></textarea>
                    {errorData["description"] ? <p className='errorMessage'>{errorData["description"]}</p> : null}
                    <label htmlFor="max_guests">Max number of guests allowed</label>
                    <input type="number" name="max_guests" min={1} max={10} step={1} id="" onChange={handleChange} />
                    {errorData["max_guests"] ? <p className='errorMessage'>{errorData["max_guests"]}</p> : null}
                    <label htmlFor="type">Room type</label>
                    <select name="type" id="" onChange={handleChange}>
                        <option value="Classic Suite">Classic Suite</option>
                        <option value="Supreme Suite">Supreme Suite</option>
                        <option value="Deluxe Suite">Deluxe Suite</option>
                        <option value="Executive Suite">Executive Suite</option>
                        <option value="Super Executive Suite">Super Executive Suite</option>
                        <option value="Self Catering Execuitve Suite">Self Catering Execuitve Suite</option>
                    </select>
                    {errorData["type"] ? <p className='errorMessage'>{errorData["type"]}</p> : null}
                    <button type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
export default RoomCreate