import API from "@/lib/axios";
import type { Project, Task, TaskFormData } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
    taskId: Task["_id"];
};

export async function createTask( {formData, projectId}: Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const { data } = await API.post(`/projects/${projectId}/tasks`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
    }
}


export async function getTaskById ({projectId , taskId} : Pick<TaskAPI, "projectId" | "taskId"> ) {
    try {
        const { data } = await API.get(`/projects/${projectId}/tasks/${taskId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
    }
}


export async function updateTask({ projectId, taskId, formData } : Pick<TaskAPI, "projectId" | "taskId" | "formData">) {
    try {
        const { data } = await API.put(`/projects/${projectId}/tasks/${taskId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function deleteTask({ projectId, taskId } : Pick<TaskAPI, "projectId" | "taskId">){
    try {
        const { data } = await API.delete(`/projects/${projectId}/tasks/${taskId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}