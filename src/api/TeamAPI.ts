import API from "@/lib/axios";
import { teamMembersSchemaResponse, type ApiResponse, type Project, type TeamMember, type TeamMemberForm } from "../types";
import { hanldeApiError } from "@/lib/axios-helpers";

export async function addUserToProject({ projectId, id } : { projectId: Project['_id'], id: TeamMember['_id'] }) {
    try {
        const { data } = await API.post(`/projects/${projectId}/team`, {id})
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function findUserByEmail({ projectId, formData } : { projectId: Project['_id'], formData: TeamMemberForm }) {
    try {
        const { data } = await API.post(`/projects/${projectId}/team/find`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function getProjectTeam(projectId: Project['_id']){
    try {
        const { data } = await API.get(`/projects/${projectId}/team`)
        const response = teamMembersSchemaResponse.safeParse(data)
        return response.data?.data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function removeUserFromProject({ projectId, userId } : { projectId: Project['_id'], userId: TeamMember['_id'] }) {
    try {
        const { data } = await API.delete<ApiResponse>(`/projects/${projectId}/team/${userId}`)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}