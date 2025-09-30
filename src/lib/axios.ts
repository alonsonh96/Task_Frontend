import { translateResponse } from "@/utils/errorTranslations";
import axios, { AxiosError, type InternalAxiosRequestConfig }  from "axios"

export interface TranslatedAxiosError extends AxiosError {
  translatedMessage?: string;
}

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
    // ===== RESPUESTAS EXITOSAS =====
    (response) => {
        const isSilentOperation = response.config.url?.includes('/auth/refresh');

        if (!isSilentOperation && response.data?.messageCode) {
            // Traducir mensaje de éxito
            const translatedMessage = translateResponse(response, false);
            
            // Agregar mensaje traducido al response
            response.data.message = translatedMessage;
        }
        return response
    },
    // ===== MANEJO DE ERRORES =====
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const isAuthRoute = originalRequest.url?.includes('/auth/');

        // ===== REFRESH TOKEN AUTOMÁTICO (solo para 401 no-auth) =====
        if (error.response?.status === 401 &&
            !originalRequest.url?.includes('/auth/refresh') &&
            !isAuthRoute &&
            !originalRequest._retry) {

            if (isRefreshing) {
                // Si ya está refrescando, agregar a la cola
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
                
                // Procesar cola de peticiones pendientes
                processQueue(null, true);
                
                // Reintentar la petición original
                return API(originalRequest);
            } catch (refreshError) {
                // Procesar cola con error
                processQueue(refreshError, false);
                
                // Redirigir a login
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // ===== TRADUCCIÓN DE ERRORES =====
        // Solo traducir errores que NO son de refresh token automático
        const shouldTranslate = !originalRequest.url?.includes('/auth/refresh');    

        if (shouldTranslate) {
            // Traducir el mensaje de error
            const translatedMessage = translateResponse(error, true);
            
            // Agregar al error para que handleApiError lo use
            (error as any).translatedMessage = translatedMessage;
        }
        // Siempre rechazar la promesa con el error
        return Promise.reject(error);
    }
)


export default API;