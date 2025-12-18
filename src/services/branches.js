import axios from "axios";
import { getToken } from "../utils/token";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/branches`
})


export const branchesIndex = ()=>{
    return api.get('')
}

export const branchRooms = (branchId)=>{
    return api.get(`/${branchId}/room/`)
}
export const createBranchRoom = (branchId,  formData)=>{
    return api.post(`/${branchId}/room/`, formData, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })
}
export const updateBranchRoom =(branchId, roomId, formData)=>{
    return api.put(`/${branchId}/room/${roomId}/`, formData, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })
}
export const roomdetails = (branchId, roomId)=>{
    return api.get(`/${branchId}/room/${roomId}/`)
}
export const branchDetails = (branchId)=>{
    return api.get(`/${branchId}/`)
}
export const roomreservations =(branchId, roomId)=>{
    return api.get(`/${branchId}/room/${roomId}/reservations/`)
}