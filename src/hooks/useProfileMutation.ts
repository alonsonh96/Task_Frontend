import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authKeys } from "./useAuthMutations";
import { changePassword, updateProfile } from "@/api/ProfileAPI";
import { ROUTE_PATHS } from "@/constants/routes";
import { useNavigate } from "react-router-dom";


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: authKeys.user})
        }
    })
}

export const useChangePasswordProfile = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: changePassword,
        onError: (error: any) => {
            const errorMessage = error.message || 'Error al cambiar la contraseña'
            toast.error(errorMessage)
        },
        onSuccess: (data) => {
            const successMessage = data?.message || 'Contraseña cambiada exitosamente'
            toast.success(successMessage)

            // Sail only after success
            setTimeout(() => {
                navigate(ROUTE_PATHS.AUTH.LOGIN)
            }, 1500)
        }
    })
}
