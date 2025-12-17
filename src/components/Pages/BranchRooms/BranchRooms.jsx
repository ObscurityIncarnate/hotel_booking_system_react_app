import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { branchRooms } from "../../../services/branches";
import { toast, ToastContainer } from "react-toastify";
import placeholder from "../../../assets/Placeholder_Image.png"
import LoadingIcon from "../../PageElements/LoadingIcon/LoadingIcon";
function BranchRooms() {
    const navigate = useNavigate()
    const { branchId } = useParams();
    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState({})
    const [rooms, setRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    useEffect(() => {
        const getBranchRooms = async () => {
            try {
                const { data } = await branchRooms(branchId)
                setRooms(data)
                setIsLoading(false)
                console.log(data)
            } catch (error) {
                if (error.response.status == 500) {
                    toast('Something went wrong please try again')
                    setErrorData(error.response.data)
                }
                toast(error.response.data)
                setErrorData(error.response.data)
            }
        }
        getBranchRooms()
    }, [])
    const handleChange = (e)=>{
        console.log(e.target)
        setFormData({... formData, [e.target.name]: e.target.value})
        const output = rooms.filter(room=>{
            return
        })
    }
    return (
        <>
            {/* filter */}
            <div>
                {/* HELLO */}
                <label htmlFor="">Dates</label>
                <input type="date" name="start_date" onChange={handleChange} />
                <input type="date" name="end_date" onChange={handleChange} />
                <label htmlFor="max_guest">Max guests</label>
                <input type="number" name="max_guest" onChange={handleChange} />
                <label htmlFor="type">Room Type</label>
                <select name="type" id="">
                    <option value="" selected="selected"></option>
                    <option value="classic">Classic</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="executive">Executive</option>
                    <option value="super_executive">Super Executive</option>
                    <option value="self_cat_executive">Self Catering Executive</option>
                </select>
            </div>
            {isLoading ? <LoadingIcon/> :
                <div>
                    {
                        rooms.map(room => {
                            return (
                                <>
                                    <div className="roomCard">
                                        <img src={room.images.length > 0 ? room.images[0] : placeholder} alt={placeholder} width={250} />
                                        <div>
                                            <p>{room.price_per_night}</p>
                                            <p>{room.type}</p>
                                            <div>
                                                <i className="fa fa-user"></i>
                                                <p> {room.max_guests}</p>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            }

            <ToastContainer />
        </>
    )
}

export default BranchRooms