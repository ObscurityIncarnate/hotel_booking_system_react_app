import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/branches`
})


export const branchesIndex = ()=>{
    return api.get('')
}

export const branchRooms = (branchId)=>{
    return api.get(`/${branchId}/room/`)
}

export const roomdetails = (branchId, roomId)=>{
    return api.get(`/${branchId}/room/${roomId}`)
}