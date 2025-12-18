import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { roomdetails, updateBranchRoom } from "../../../services/branches"
import { toast, ToastContainer } from "react-toastify"
import LoadingIcon from "../../PageElements/LoadingIcon/LoadingIcon"
import ImageUploadField from "../../PageElements/ImageUploadField/ImageUploadField"
import { uploadImage } from "../../../services/cloudinary"

function RoomUpdate
    () {
    const navigate = useNavigate()
    const { branchId, roomId } = useParams()
    const [formData, setFormData] = useState({
        type: "",
        description: "",
        price_per_night: "",
        max_guests: null,
        images: []
    })
    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const requestData = async () => {
            try {
                const { data } = await roomdetails(branchId, roomId)
                setFormData(data)
                setIsLoading(false)
            } catch (error) {
                if (error.response.status == 500) {
                    toast("Something went wrong. Please try again later")
                }
                toast(error.response.data?.detail)
                setErrorData(error.response.data)
            }
        }
        requestData()
    }, [])
    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            console.log(formData)
            const response = await updateBranchRoom(branchId, roomId, formData)
            navigate(`/branches/${branchId}/rooms/${roomId}`)
        } catch (error) {
            if (error.response.status == 500) {
                toast("Something went wrong please try again later")
            }
            toast(error.response.data?.detail)
            console.log(error)
            setErrorData(error.response.data)
        }
        setIsLoading(false)
    }
    const handleFileUpload = async (e) => {
        setIsLoading(true)
        try {
            const files = e.target.files
            console.log(files)
            Array.from(files).map(async (file) => {
                try {
                    const { data } = await uploadImage(file)
                    setFormData(prev => ({ ...prev, images: [...prev.images, data.secure_url] }))
                } catch (error) {
                    toast(error.response.data?.error?.message)
                    setErrorData(error.response.data)
                }
            })
        } catch (error) {
            toast(error.response.data?.error?.message)
            setErrorData(error.response.data)
        }
        setIsLoading(false)
    }
    const removeImage = (index) => {
        const files = [...formData.images]
        files.splice(index, 1)
        setFormData(prev => ({ ...prev, images: files }))
    }
    return (

        <>
            {isLoading ? <LoadingIcon /> :
                <div className="form-box">
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="price_per_night">Price per night</label>
                        <input type="text" inputMode="decimal"
                            id="float-input" name="price_per_night"
                            pattern="[0-9]*[.,]?[0-9]*" value={formData.price_per_night} onChange={handleChange} required />
                        {errorData["price_per_night"] ? <p className='errorMessage'>{errorData["price_per_night"]}</p> : null}
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="" value={formData.description} onChange={handleChange} required></textarea>
                        {errorData["description"] ? <p className='errorMessage'>{errorData["description"]}</p> : null}
                        <label htmlFor="max_guests">Max number of guests allowed</label>
                        <input type="number" name="max_guests" value={formData.max_guests} min={1} max={10} step={1} id="" onChange={handleChange} />
                        {errorData["max_guests"] ? <p className='errorMessage'>{errorData["max_guests"]}</p> : null}
                        <label htmlFor="type">Room type</label>
                        <select name="type" id="" value={formData.type} onChange={handleChange}>
                            <option value="Classic Suite">Classic Suite</option>
                            <option value="Supreme Suite">Supreme Suite</option>
                            <option value="Deluxe Suite">Deluxe Suite</option>
                            <option value="Executive Suite">Executive Suite</option>
                            <option value="Super Executive Suite">Super Executive Suite</option>
                            <option value="Self Catering Execuitve Suite">Self Catering Execuitve Suite</option>
                        </select>
                        {errorData["type"] ? <p className='errorMessage'>{errorData["type"]}</p> : null}
                        <label htmlFor="">
                            Please upload and image
                        </label>
                        <input type='file' accept="image/*" onChange={handleFileUpload} multiple />
                        <div >
                            {formData.images ?
                                formData.images.map((image, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={image} alt={`uploaded image ${index}`} width={50} height={50} />
                                            <button onClick={() => { removeImage(index) }}>X</button>
                                        </div>
                                    )
                                })
                                : null}
                        </div>
                        {errorData.images && <p className='error-message'>{errorData.images}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            }
            <ToastContainer />
        </>
    )
}
export default RoomUpdate
