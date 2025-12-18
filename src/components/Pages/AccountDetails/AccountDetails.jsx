import { useContext, useEffect, useState } from "react"
import { getUserDetails, getUserReservations } from "../../../services/account"
import { useNavigate, useParams } from "react-router"
import { toast, ToastContainer } from "react-toastify"
import './AccountDetails.css'
import LoadingIcon from "../../PageElements/LoadingIcon/LoadingIcon"
import { UserContext } from "../../../contexts/UserContext"
function AccountDetails() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [reservations, setReservations] = useState([])
    const [userDetails, setUserDetails] = useState({})
    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { user, signOut } = useContext(UserContext)
    useEffect( () => {
        const retrieveData = async () => {
            try {
                const userReservations = await getUserReservations(userId)
                setReservations(userReservations.data)
                const userDetails = await getUserDetails(userId)
                setUserDetails(userDetails.data)
                console.log(userReservations.data)
                // console.log(userDetails.data)

                setIsLoading(false)
            } catch (error) {
                if (error.response.status == 500) {
                    toast('Something went wrong. Please try again later')
                    setErrorData(error.response.data)
                }
                    toast(error.response.data?.detail)
                    setErrorData(error.response.data)   
            }            
        }
        retrieveData()
    }, [])
    const handleSignOut = ()=>{
        signOut()
        navigate("")
    }
    return (
        <>
            {isLoading ? <LoadingIcon /> :
                <div>
                    <div>
                        <h3>Reservations</h3>
                        <div>
                            {/* {reservations.map(reservation=>{
                                return(
                                <div key={reservation.id} className="Reservation">

                                </div>
                                )
                            })} */}
                        </div>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                    <ToastContainer/>
                </div>}

        </>
    )
}

export default AccountDetails