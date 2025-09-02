import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNote, deleteNote } from "@/api/NoteAPI";
import { taskKeys } from "./useTaskMutation";


export const useCreateNote = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskId)})
        }
    })
}

export const useDeleteNote = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskId)})
        }
    })
}