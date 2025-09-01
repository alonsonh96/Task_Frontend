import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { authenticateUser, confirmAccount, createAccount, forgotPassword, logoutUser, requestConfirmationCode, updatePasswordWithToken, validateToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";


export const authKeys = {
    user: ['auth', 'user'] as const,
};

export const useCreateAccount = () => {
    return useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
        }
    })
}

export const useConfirmAccount = () => {
    return useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
        }
    })
}

export const useRequestConfirmationCode = () => {
    return useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
        }
    })
}

export const useLogin = () => {
    const navigate = useNavigate();
    const location = window.location as any;

    return useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Iniciando sesión')
            const redirectTo = location.state?.from?.pathname || '/'
            navigate(redirectTo, { replace: true })
        },
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data.message)
        }
    })
}

export const useValidateToken = (setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>) => {
    return useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
            setIsValidToken(false)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            setIsValidToken(true)
        },
    })
}

export const useUpdatePasswordWithToken = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            navigate(ROUTE_PATHS.AUTH.LOGIN)
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: logoutUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user })
            queryClient.clear()
            navigate(ROUTE_PATHS.AUTH.LOGIN)
            toast.success('Sesión cerrada correctamente');
        }
    })
}