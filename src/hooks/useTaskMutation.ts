import { createTask, deleteTask, getTaskById, updateTask, updateTaskStatus } from "@/api/TaskAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { projectKeys } from "./useProjectMutation";
import { useNavigate } from "react-router-dom";

export const taskKeys = {
    all: ['tasks'] as const,
    list: () => [...taskKeys.all, 'list'] as const,
    detail: (id: string) => [...taskKeys.all, 'detail', id] as const,    
}

export const useCreateTask = (projectId: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
            toast.success(data.message)
            
            // Close the modal after creating the task
            navigate(location.pathname, { replace: true });
        }
    })
}

export const useTaskById = (projectId: string, taskId: string) => {
    // Validate that both projectId and taskId exist
    const shouldQuery = !!(projectId && taskId)

    return useQuery({
        queryKey: taskKeys.detail(taskId),
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: shouldQuery,
        retry: false
    })
}

export const useUpdateTask = (projectId: string, taskId: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            const keysToInvalidate = [
                projectKeys.detail(projectId),
                taskKeys.detail(taskId),
            ];
            keysToInvalidate.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: key });
            });
            toast.success(data.message);
            navigate(location.pathname, { replace: true });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}

export const useDeleteTask = (projectId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Tarea eliminada correctamente");
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
        },
    })
}

export const useUpdateTaskStatus = (projectId: string, taskId: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTaskStatus,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
            queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
            navigate(location.pathname, { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}