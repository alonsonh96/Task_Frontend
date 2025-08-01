import API from "@/lib/axios";
import type { Project, TaskFormData } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
};

export async function createTask( {formData, projectId}: Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const { data } = await API.post(`/projects/${projectId}/tasks`, formData);
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
    }
}
