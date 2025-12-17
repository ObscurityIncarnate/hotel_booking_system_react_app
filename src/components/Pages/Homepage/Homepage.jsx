import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { branchesIndex } from "../../../services/branches"
import LoadingIcon from "../../PageElements/LoadingIcon/LoadingIcon"
import { toast, ToastContainer } from "react-toastify"
import placeholder from "../../../assets/Placeholder_Image.png"
import { useNavigate } from "react-router"
function Homepage() {
    let navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [branches, setBranches] = useState({})
    const [currentBranch, setCurrentBranch] = useState(0)
    useEffect(() => {
        const getBranches = async () => {
            try {
                const { data } = await branchesIndex()
                setIsLoading(false)
                setBranches(data)
                console.log(data)
            } catch (error) {
                console.log(error)
                if (error.response.status == 500) {
                    toast('Something went wrong please try again')
                    setErrorData(error.response.data)
                }
                toast(error.response.data?.detail)
                setErrorData(error.response.data)
            }
        }
        getBranches()
    }, [])
    useEffect(() => {
        if (!branches.length>0) return

        const interval = setInterval(() => {
            setCurrentBranch(prev => (prev + 1) % branches.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [branches.length])
    const handleClick = ()=>{
        navigate(`/branches/${branches[currentBranch].id}/rooms`)
    }
    const carouselBranches = () => {
        const branch = branches[currentBranch]

        return (
            <div onClick={handleClick}>
                <p>{branch.name}</p>
                <button onClick={handleClick}>Explore {branch.name}</button>
                <img src={branch.images[0] ? branch.images[0] : placeholder} alt="location image" />
            </div>
        )

    }
    return (
        <>
            {
                isLoading ?
                    <LoadingIcon></LoadingIcon> :
                    <div>
                        {branches && branches.length > 0 ?
                            <div>
                                {carouselBranches()}
                            </div> :
                            <p>No Branches found</p>

                        }
                    </div>
            }
            <ToastContainer />
        </>
    )
}

export default Homepage