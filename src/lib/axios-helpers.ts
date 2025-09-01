import { isAxiosError } from "axios";

export const hanldeApiError = (error: unknown): never => {
    if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message
        const statusMessage = error.response?.statusText
        const genericMessage = error.message

        const message = apiMessage || statusMessage || genericMessage || 'Error desconocido'
        throw new Error(message)
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