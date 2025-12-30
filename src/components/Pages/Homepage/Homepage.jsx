import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { branchesIndex } from "../../../services/branches"
import LoadingIcon from "../../PageElements/LoadingIcon/LoadingIcon"
import { toast, ToastContainer } from "react-toastify"
import placeholder from "../../../assets/Placeholder_Image.png"
import { useNavigate } from "react-router"
import './Homepage.css'
function Homepage() {
    let navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [branches, setBranches] = useState({})
    const [currentBranch, setCurrentBranch] = useState(0)
    const [startingPos, setStartingPos] = useState([])
    const [swiping, setSwiping] = useState(false)
    useEffect(() => {
        const getBranches = async () => {
            try {
                const { data } = await branchesIndex()
                setIsLoading(false)
                setBranches(data)
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
        if (!branches || !(branches.length > 0) || swiping) return

        const timeout = setTimeout(() => {
            setCurrentBranch(prev => (prev + 1) % branches.length)
        }, 10000)

        return () => clearTimeout(timeout)
    }, [branches.length, swiping, currentBranch])

    const handleClick = () => {
        navigate(`/branches/${branches[currentBranch].id}/rooms`)
    }
    const handleMouseUp = (e) => {
        if (swiping) {
            const finalPos = [e.pageX, e.pageY]
            if (finalPos[0] - startingPos[0] > 50) {
                setCurrentBranch(prev => (prev + 1) % branches.length)
            } else if (finalPos[0] - startingPos[0] < -50) {
                setCurrentBranch(prev => (((prev - 1) % branches.length) +branches.length)%branches.length)
            } else {
                handleClick()
            }
        }

        setSwiping(false)
    }
    const handleMouseDown = (e) => {
        setStartingPos([e.pageX, e.pageY])
        setSwiping(true)
    }
    const carouselBranches = () => {
        const branch = branches[currentBranch]
        const bgImage = branch.images[0] || placeholder
        return (
            <div className="branchGallery overlay-content"
                style={{ backgroundImage: `url(${bgImage})`, }}
                onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp}>
                <h1>{branch.name}</h1>
                <button onClick={handleClick}>Explore</button>
            </div>
        )

    }

    return (
        <>
            {
                isLoading ?
                    <LoadingIcon></LoadingIcon> :
                    <div className="body">
                        {branches && branches.length > 0 ?

                            carouselBranches()
                            :
                            <p>No Branches found</p>

                        }
                    </div>
            }
            <ToastContainer />
        </>
    )
}

export default Homepage