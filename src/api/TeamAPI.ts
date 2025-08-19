import { isAxiosError } from "axios";
import API from "@/lib/axios";
import type { TeamMemberForm, Project } from "../types";

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