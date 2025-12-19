import { useContext, useEffect, useState } from "react"
import { cancelUserReservations, getUserDetails, getUserReservations } from "../../../services/account"
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
    useEffect(() => {
        const retrieveData = async () => {
            try {
                const userReservations = await getUserReservations(userId)


                setReservations(userReservations.data)
                const userDetails = await getUserDetails(userId)
                setUserDetails(userDetails.data)
                console.log(userReservations.data)
                console.log(userDetails.data)

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
    const handleSignOut = () => {
        signOut()
        navigate("/")
    }
    const deleteReservation  = async(id)=>{
        try {
            console.log(id) 
            const result = await cancelUserReservations(userId, id)
            console.log( result)
            const index=  reservations.findIndex(reservation=>reservation.id ==id)  
            const removeRes =  [...reservations]      
            removeRes.splice(index, 1)
            setReservations(removeRes) 
            toast("Successfully deleted reservation")
        } catch (error) {
            if(error.response.status == 500){
                toast("Something went wrong please try again later")
            }
            toast(error.response.data?.detail)
            setErrorData(error.response.data)
        }

    }
    const displayReservation =  (reservation) => {
        var today = new Date()
        const start_date = new Date(reservation.start_date)
        if(today< start_date){
           return ( 
           <div key={reservation.id} className="Reservation active">
                <p>Start Date: {reservation.start_date}</p>
                <p>End Date: {reservation.end_date}</p>
                <p>Cost: £{reservation.cost}</p>
                <p>Reserved on: {reservation.reserved_on.split("T")[0]}</p>
                <button onClick={()=>{deleteReservation(reservation.id)}}>Cancel Reservation</button>
            </div>    
            )        
        }else{
           return(
           <div key={reservation.id} className="Reservation inactive">
                <p>Start Date: {reservation.start_date}</p>
                <p>End Date: {reservation.end_date}</p>
                <p>Cost: £{reservation.cost}</p>
                <p>Reserved on: {reservation.reserved_on.split("T")[0]}</p>
            </div>  
            )              
        }

    }
    return (
        <div className="body">
            {isLoading ? <LoadingIcon /> :
                <div>
                    <div>
                        <h3>User Details</h3>
                        <div>
                            <span>Username:</span>
                            <span>{userDetails.username}</span>
                        </div>
                        <div>
                            <span>Email:</span>
                            <span>{userDetails.email}</span>
                        </div>
                    </div>
                    <div>
                        <h3>Reservations</h3>
                        <div>
                            {reservations.map(reservation => {
                                return (
                                    displayReservation(reservation)
                                )
                            })}
                        </div>
                        <button onClick={handleSignOut}>Sign Out</button>
                        {/* <button> Delete Account</button> */}
                    </div>
                    <ToastContainer />
                </div>}

        </div>
    )
}

export default AccountDetails