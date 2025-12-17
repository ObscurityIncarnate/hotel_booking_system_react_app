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
    const [formData, setFormData] = useState({
        "max_guests": 1,
        "type" :""
    })
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
    useEffect(()=>{
        let output = [...rooms]
        if(formData.max_guests && formData.max_guests>1){
            output = output.filter(room=>room.max_guests>=formData.max_guests)
        }
        if(formData.type && formData.type != ""){
            output = output.filter(room=>room.type === formData.type)
        }

        setFilteredRooms(output)
    }, [rooms, formData])
    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleClear = ()=>{
        setFormData({
        "max_guests": 1,
        "type" :""})
        setFilteredRooms(rooms)
    }
    return (
        <>
            {/* filter */}
            <div>
                {/* <label htmlFor="">Dates</label>
                <input type="date" name="start_date" onChange={handleChange} />
                <input type="date" name="end_date" onChange={handleChange} /> */}
                <label htmlFor="max_guest">Max guests</label>
                <input type="number" name="max_guests" min={1} max={10} step={1} value={formData.max_guests} onChange={handleChange} />
                <label htmlFor="type">Room Type</label>
                <select name="type" id="" value={formData.type} onChange={handleChange}>
                    <option value=""></option>
                    <option value="Classic Suite">Classic</option>
                    <option value="Supreme Suite">Supreme</option>
                    <option value="Deluxe Suite">Deluxe</option>
                    <option value="Executive Suite">Executive</option>
                    <option value="Super Executive Suite">Super Executive</option>
                    <option value="Self Catering Execuitve Suite">Self Catering Executive</option>
                </select>
                <button onClick={handleClear}>Clear</button>
            </div>
            {isLoading ? <LoadingIcon /> :
                <div>
                    {
                        filteredRooms.map(room => {
                            return (
                                <>
                                    <div className="roomCard" key={room.id} onClick={()=>{navigate(`${room.id}`)}}>
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