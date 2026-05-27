import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true

})


axiosInstance.interceptors.response.use(
    (response) => {
        console.log("axiosInstance response", response)
        return response
    },
    (error) => {
        console.log("error in instance", error)
    }
)