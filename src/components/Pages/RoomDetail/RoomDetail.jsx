import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { branchDetails, branchesIndex, roomdetails, roomreservations } from "../../../services/branches"
import { toast, ToastContainer } from "react-toastify"
import placeholder from "../../../assets/Placeholder_Image.png"
import MapContainer from "../../PageElements/MapContainer/MapContainer"
import LoadingIcon from "../../PageElements/LoadingIcon/LoadingIcon"
import "react-day-picker/style.css";
import "./RoomDetail.css"
import { DayPicker } from "react-day-picker"
import { UserContext } from "../../../contexts/UserContext"

function RoomDetail() {
    const { user } = useContext(UserContext)
    console.log(user)
    const navigate = useNavigate()
    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [room, setRoom] = useState({
        description: "",
        images: [],
        max_guests: null,
        price_per_night: "",
        type: ""
    })
    const [range, setRange] = useState();
    const [validReservation, setValidReservation] = useState(false)
    const [branch, setBranch] = useState({})
    const [reservations, setReservation] = useState({})
    const { branchId, roomId } = useParams()
    useEffect(() => {
        const getRoomDetails = async () => {
            try {
                const { data } = await roomdetails(branchId, roomId)
                console.log(data)
                setRoom(data)
                const branch = await branchDetails(branchId)
                setBranch(branch.data)
                const reservations = await roomreservations(branchId, roomId)
                setReservation(reservations.data)
                setIsLoading(false)
            } catch (error) {
                if (error.response.status == 500) {
                    toast("Something went wrong. Please try again later")
                    setErrorData({ message: "Something went wrong. Please try again later" })
                }
                toast(error.response.data?.detail)
                setErrorData(error.response.data)
            }

        }
        getRoomDetails()
    }, [])
    useEffect(() => {
        const checkReservationDate = () => {
            console.log(reservations)
            if (range && range.from && range.to) {

                const overlap = reservations.some(reservation => {
                    return range.from < new Date(reservation.end_date) && range.to > new Date(reservation.start_date)
                })
                overlap ? setValidReservation(false) : setValidReservation(true)
            } else {
                setValidReservation(false)
            }
        }
        checkReservationDate()
    }, [range])
    const getTotal = () => {

        const msToDay = 86400000
        let days = (range.to - range.from) / msToDay
        if (days < 1) days = 1
        return (room.price_per_night * 1.2 * days).toFixed(2)
    }

    // checkReservationDate()
    return (
        !isLoading ?
            <div className="body">
                <div className="room-container">
                    {user && user.is_staff ?
                        <button className="edit-room-btn" onClick={() => {
                            navigate(`/branches/${branchId}/room/${roomId}/edit`)
                        }}>Edit Room</button> : null
                    }
                    <div className="gallery">
                        <div>
                            <img src={room.images.length > 0 ? room.images[0] : placeholder} onError={(e) => e.currentTarget.src = placeholder} alt="room image" width="40%" height="30%" />
                        </div>
                        {
                            room.images.length > 1 ?
                                <div style={{ backgroundImage: room.images[1] }}>
                                    <p>{room.images.length - 1} more images</p>
                                </div>
                                : null}
                    </div>
                    <div className="room-main">
                        <div className="room-left">
                            <div className="description">
                                <h3>Description</h3>
                                <p>{room.description}</p>
                            </div>
                            <MapContainer longitude={parseFloat(branch.longitude)} latitude={parseFloat(branch.latitude)}>

                            </MapContainer>
                        </div>
                        <div className="room-right">
                            {/* <div>
                                <label htmlFor="stay range">Dates</label>
                                <DayPicker mode="range" aria-labelledby="stay range" numberOfMonths={1} selected={range} onSelect={setRange} required />
                                <label htmlFor="guest">Guest(s)</label>
                                <input type="number" min={1} max={room.max_guests} defaultValue={1} step={1} name="guest" id="" required />
                                <h3>Price</h3>
                                <div>
                                    <span>Base rate: </span>
                                    <span>£{room.price_per_night}</span>
                                </div>
                                <div>
                                    <span>VAT / GST: </span>
                                    <span>£{(0.2 * room.price_per_night).toFixed(2)}</span>
                                </div>
                                <div>
                                    <span>Due Today: </span>
                                    {range && range.from && range.to ? <span>£{getTotal()}</span> : <span>-</span>}
                                </div>
                                <button disabled={!validReservation}>Reserve</button>
                                {validReservation ? null : <p className="errorMessage">This room is already reserved within your selected dates</p>}
                            </div> */}
                            <div className="booking-box">
                                <label className="booking-label">Dates</label>
                                <DayPicker
                                    mode="range"
                                    numberOfMonths={1}
                                    selected={range}
                                    onSelect={setRange}
                                />

                                <label className="booking-label">Guest(s)</label>
                                <input
                                    className="booking-input"
                                    type="number"
                                    min={1}
                                    max={room.max_guests}
                                    defaultValue={1}
                                />

                                <h3 className="price-title">Price</h3>

                                <div className="price-row">
                                    <span>Base rate</span>
                                    <span>£{room.price_per_night}</span>
                                </div>

                                <div className="price-row">
                                    <span>VAT / GST</span>
                                    <span>£{(0.2 * room.price_per_night).toFixed(2)}</span>
                                </div>

                                <div className="price-row total">
                                    <span>Due today</span>
                                    {range?.from && range?.to ? (
                                        <span>£{getTotal()}</span>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </div>

                                <button onClick={()=>{navigate("/payment")}} disabled={!validReservation}>Reserve</button>

                                {!validReservation && (
                                    <p className="errorMessage">
                                        This room is already reserved within your selected dates
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
                <ToastContainer />
            </div> : <LoadingIcon></LoadingIcon>
    )
}

export default RoomDetail