import axios, { AxiosError, type InternalAxiosRequestConfig }  from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})


// Variables to control multiple refreshes
let isRefreshing = false;
let failedQueue: Array<{  resolve: (value?: unknown) => void ; reject: (reason?: unknown) => void }> = [];

const processQueue = (error: unknown, success = false) => {
    failedQueue.forEach(prom => {
        if(error){
            prom.reject(error)
        }else{
            prom.resolve(success)
        }
    })
    failedQueue = []
};


API.interceptors.response.use(
    response => response, // If the response was successful, we return it
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        const isAuthRoute = originalRequest.url?.includes('/auth/');

        if (error.response?.status === 401 &&
            !originalRequest.url?.includes('/auth/refresh') &&
            !isAuthRoute &&
            !originalRequest._retry) {

            if (isRefreshing) {
                // If already refreshing, add to queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    return API(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await API.post('/auth/refresh');
                
                // Process pending request queue
                processQueue(null, true); // Retry queued requests
                
                // Retry the original request
                return API(originalRequest);
            } catch (refreshError) {
                // Procesar cola con error
                processQueue(refreshError, false);
                
                // Redirect to login
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        
        return Promise.reject(error);
    }
)


export default API;