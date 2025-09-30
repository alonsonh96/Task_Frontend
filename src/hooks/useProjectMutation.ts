import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { 
    createProject,
    deleteProject,
    getProjects,
    getProjectsById,
    updateProject,
} from "@/api/ProjectAPI";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";


export const projectKeys = {
  all: ['projects'] as const,
  list: () => [...projectKeys.all, 'list'] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
};


export const useGetProjects = () => {
    return useQuery({
        queryKey: projectKeys.list(), // ["projects", "list"]
        queryFn: getProjects,
    })
}

export const useProjectById = (id: string) => {
    return useQuery({
        queryKey: projectKeys.detail(id), // ["projects", "detail", id]
        queryFn: () => getProjectsById(id),
        retry: false,
        enabled: !!id,
    })
}

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.list() })
            toast.success(data.message)
            navigate(ROUTE_PATHS.HOME)
        }
    })
}

export const useUpdateProject = (id: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.list() });
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
            toast.success(data.message)
            navigate(ROUTE_PATHS.HOME)
        }
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.list() });
            toast.success(data.message);
            navigate(location.pathname, { replace: true })     
        },
    })
}