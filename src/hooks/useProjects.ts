import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { 
  getProjects,
  getProjectsById,
} from "@/api/ProjectAPI";
import type { Project, ProjectFormData } from "@/types/projects";


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