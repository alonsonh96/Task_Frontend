import API from "@/lib/axios"
import { dashboardProjectSchema, type Project, type ProjectFormData } from "../types"
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


export async function getProjectsById(id : Project['_id']) {
    try {
        const { data } = await API.get(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId:  Project['_id']
}

export async function updateProject({formData, projectId} : ProjectAPIType) {
    try {
        const { data } = await API.put(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}