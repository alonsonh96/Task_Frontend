import { isAxiosError } from "axios";
import API from "@/lib/axios";
import type { Note, NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
    formData: NoteFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    noteId: Note['_id']
}


export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
       const { data } = await API.post(`/projects/${projectId}/tasks/${taskId}/notes`, formData)
       return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteNote({ projectId, taskId, noteId } : Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const { data } = await API.delete(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}