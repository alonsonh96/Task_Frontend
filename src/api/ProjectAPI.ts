import API from "@/lib/axios"
import { dashboardProjectSchema, type Project, type ProjectFormData } from "../types"
import { hanldeApiError } from "@/lib/axios-helpers"

export async function createProject( formData : ProjectFormData) {
    try {
        const { data } = await API.post('/projects', formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}



export async function getProjects() {
    try {
        const { data } = await API.get('/projects')
        const response = dashboardProjectSchema.safeParse(data.data)
        return response.data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function getProjectsById(id : Project['_id']) {
    try {
        const { data } = await API.get(`/projects/${id}`)
        return data.data
    } catch (error) {
        hanldeApiError(error)
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
        hanldeApiError(error)
    }
}


export async function deleteProject(id : Project['_id']) {
    try {
        const { data } = await API.delete(`/projects/${id}`)
        return data.message
    } catch (error) {
        hanldeApiError(error)
    }
}