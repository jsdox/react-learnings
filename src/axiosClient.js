import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

//interceptors modify request before they send, handy to handle 
//authentication token (store in local storage and add it in request header)
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEM');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEM');
            }
        } catch {
            console.log(error);
        }
        throw error;
    }
    
);

export default axiosClient;