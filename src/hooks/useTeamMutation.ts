import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
    addUserToProject, 
    findUserByEmail, 
    getProjectTeam, 
    removeUserFromProject 
} from "@/api/TeamAPI";
import { projectKeys } from "./useProjectMutation";

export const teamKeys = {
    all: ['projectTeam'] as const,
    list: () => [...teamKeys.all, 'list'] as const,
    detail: (id: string) => [...teamKeys.all, 'detail', id] as const,
}

export const useAddUserToProject = (projectId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: addUserToProject,
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId)})
            queryClient.invalidateQueries({ queryKey: teamKeys.detail(projectId)})
            navigate(location.pathname, { replace: true })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useFindUserByEmail = () => {
    return useMutation({
        mutationFn: findUserByEmail,
    }) 
}

export const useGetProjectTeam = (projectId: string) => {
    return useQuery({
        queryKey: teamKeys.detail(projectId),
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })
}

export const useRemoveUserFromProject = (projectId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: teamKeys.detail(projectId)})
        }
    })
}