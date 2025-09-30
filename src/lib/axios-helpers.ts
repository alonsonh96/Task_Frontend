import { isAxiosError } from "axios";

interface TranslatedAxiosError extends Error {
    translatedMessage?: string;
    response?: any;
}


export const hanldeApiError = (error: unknown): never => {
    if (isAxiosError(error)) {
        // 1. Primero intentar obtener el mensaje traducido del interceptor
        const translatedMessage = (error as TranslatedAxiosError).translatedMessage;
        
        if (translatedMessage) {
            throw new Error(translatedMessage);
        }

        // 2. Fallback: si no hay traducción (no debería pasar), usar los mensajes originales
        const apiMessage = error.response?.data?.messageCode
        throw new Error(apiMessage || 'Error desconocido')
    }

    if (error instanceof Error) {
        throw error
    }

     throw new Error('Error inesperado')
}

export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
}