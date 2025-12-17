import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { roomdetails } from "../../../services/branches"
import { toast, ToastContainer } from "react-toastify"

function RoomDetail(){
    const navigate = useNavigate()
    const [errorData, setErrorData] = useState({})
    const {branchId, roomId} =  useParams()     
    useEffect(()=>{
        const getRoomDetails =  async()=>{
            try {      
                const {data} = await roomdetails(branchId, roomId)
                console.log(data)                  
            } catch (error) {
                if(error.response.status== 500){
                    toast("Something went wrong. Please try again later")
                    setErrorData({message: "Something went wrong. Please try again later" })
                }
                toast(error.response.data?.detail )
                setErrorData(error.response.data)
            }
         
        }
        getRoomDetails()
    },[])
    return(
        <>
            <div>
            
            </div>
            <ToastContainer/>
        </>
    )
}

export default RoomDetail