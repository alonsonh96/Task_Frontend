import API from "@/lib/axios"
import type { ProjectFormData } from "../types"
import { isAxiosError } from "axios"

export async function createProject( formData : ProjectFormData) {
    try {
        const { data } = await API.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}