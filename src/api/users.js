
import axios from "axios";

export const apiActivosUsers = axios.create({
    baseURL: process.env.REACT_APP_ACTIVOS_BACKEND_URL + '/api/core',
    // headers: {
    //     'Authorization' : `Token ${token}`
    // }
})