import axios from "axios";
import { getToken } from "../utils/token";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/users`
})

export const getUserReservations = (userId) => {
    return api.get(`/${userId}/reservations/`)
}

export const getUserDetails = (userId) => {
    return api.get(`/${userId}/`)
}
export const cancelUserReservations = (userId, reservationId) => {
    return api.delete(`/${userId}/reservations/${reservationId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    })
}
