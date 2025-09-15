import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import type { ConfirmToken, NewPasswordForm } from "@/types/auth";
import { useUpdatePasswordWithToken } from "@/hooks/useAuthMutations";


type NewPasswordFormDataProps = {
    token: ConfirmToken['token'],
}


const NewPasswordFormData = ( { token }  : NewPasswordFormDataProps ) => {

    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const password = watch('password');

    const { mutate } = useUpdatePasswordWithToken()

    const handleNewPassword = (formData: NewPasswordForm) => {
        mutate({ formData, token })
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(handleNewPassword)}
            noValidate
            className="w-full"
        >
            <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                    Contraseña
                </label>

                <input
                    type='password'
                    placeholder="Ingresar nueva contraseña"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all text-white placeholder-slate-500
                    ${errors.password
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                    : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50'
                    }`}
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener mínimo de 8 caracteres'
                        }
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                    Repetir contraseña
                </label>

                <input
                    id='password_confirmation'
                    type='password'
                    placeholder='Repetir la contraseña de registro'
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all text-white placeholder-slate-500
                    ${errors.password_confirmation
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                    : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50'
                    }`}
                    {...register('password_confirmation', {
                        required: 'Repetir la contraseña es obligatorio',
                        validate: value =>
                            value === password || 'Las contraseñas no son iguales'
                    })}
                />

                {errors.password_confirmation && (
                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                )}
            </div>

            <input
                type='submit'
                value='Establecer contraseña'
                className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
            />
        </form>
    )

}

export default NewPasswordFormData
