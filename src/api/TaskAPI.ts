import API from "@/lib/axios";
import { taskResponseSchema, type Project, type Task, type TaskFormData } from "../types";
import { hanldeApiError } from "@/lib/axios-helpers";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
    taskId: Task["_id"];
    status: Task["status"]
};

export async function createTask( {formData, projectId}: Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const { data } = await API.post(`/projects/${projectId}/tasks`, formData);
        return data;
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function getTaskById ({projectId , taskId} : Pick<TaskAPI, "projectId" | "taskId"> ) {
    try {
        const { data } = await API.get<Task>(`/projects/${projectId}/tasks/${taskId}`);
        const response = taskResponseSchema.safeParse(data);
        if(response.success) return response.data;
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function updateTask({ projectId, taskId, formData } : Pick<TaskAPI, "projectId" | "taskId" | "formData">) {
    try {
        const { data } = await API.put(`/projects/${projectId}/tasks/${taskId}`, formData);
        return data;
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function deleteTask({ projectId, taskId } : Pick<TaskAPI, "projectId" | "taskId">){
    try {
        const { data } = await API.delete(`/projects/${projectId}/tasks/${taskId}`);
        return data;
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function updateTaskStatus({ projectId, taskId, status }: Pick<TaskAPI, "projectId" | "taskId" | "status">) {
    try {
        const { data } = await API.post(`/projects/${projectId}/tasks/${taskId}/status`, { status });
        return data;
    } catch (error) {
        hanldeApiError(error)
    }
}