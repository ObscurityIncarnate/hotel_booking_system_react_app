import axios from "axios";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/users`
})

export const getUserReservations = (userId)=>{
    return api.get(`/${userId}/reservations/`)
}

export const getUserDetails = (userId)=>{
    return api.get(`/${userId}/`)
}
