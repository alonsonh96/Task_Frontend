import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, logoutUser } from "@/api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";


export const useAuth = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    })


    const logout = async() => {
        try {
            await logoutUser()
            queryClient.invalidateQueries({ queryKey: ['user'] })
            navigate(ROUTE_PATHS.AUTH.LOGIN)

        } catch (error) {
            console.error('Logout error:', error)
            queryClient.clear()
            navigate(ROUTE_PATHS.AUTH.LOGIN)
        }
    }


    return { data, isError, isLoading, logout }
}