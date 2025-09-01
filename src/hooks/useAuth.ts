import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";
import { authKeys } from "./useAuthMutations";

export const useAuth = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: authKeys.user,
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    })

    return { data, isError, isLoading }
}