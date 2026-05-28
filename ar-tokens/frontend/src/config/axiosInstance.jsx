import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalReq = error.config;

        if (error.response?.status === 401) {
            
            // Fix: Break loop if refresh token endpoint fails
            if (originalReq.url.includes("/api/auth/get-accessToken")) {
                // Only redirect if you are NOT already on the login page
                if (window.location.pathname !== "/") {
                    window.location.href = "/"; 
                }
                return Promise.reject(error);
            }

            if (!originalReq.retry) {
                originalReq.retry = true;
                
                try {
                    await axiosInstance.get("/api/auth/get-accessToken");
                    return axiosInstance(originalReq);
                } catch (refreshError) {
                    // Fix: Only redirect if you are NOT already on the home/login page
                    if (window.location.pathname !== "/") {
                        window.location.href = "/";
                    }
                    return Promise.reject(refreshError);
                }
            }
        }
        
        return Promise.reject(error);
    }
);
