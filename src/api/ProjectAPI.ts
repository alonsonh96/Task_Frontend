import API from "@/lib/axios"
import { dashboardProjectSchema, type ProjectFormData } from "../types"
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



export async function getProjects() {
    try {
        const { data } = await API.get('/projects')
        const response = dashboardProjectSchema.safeParse(data.data)
        return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}