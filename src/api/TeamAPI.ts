import { isAxiosError } from "axios";
import API from "@/lib/axios";
import { type TeamMemberForm, type Project, type TeamMember, teamMembersSchemaResponse, type ApiResponse } from "../types";

export async function findUserByEmail({ projectId, formData } : { projectId: Project['_id'], formData: TeamMemberForm }) {
    try {
        const { data } = await API.post(`/projects/${projectId}/team/find`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function addUserToProject({ projectId, id } : { projectId: Project['_id'], id: TeamMember['_id'] }) {
    try {
        const { data } = await API.post(`/projects/${projectId}/team`, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function getProjectTeam(projectId: Project['_id']){
    try {
        const { data } = await API.get(`/projects/${projectId}/team`)
        const response = teamMembersSchemaResponse.safeParse(data)
        return response.data?.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function removeUserFromProject({ projectId, userId } : { projectId: Project['_id'], userId: TeamMember['_id'] }) {
    try {
        const { data } = await API.delete<ApiResponse>(`/projects/${projectId}/team/${userId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}