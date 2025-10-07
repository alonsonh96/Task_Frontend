import { useForm } from "react-hook-form";
import type { ConfirmToken, NewPasswordForm } from "@/types/auth";
import { useUpdatePasswordWithToken } from "@/hooks/useAuthMutations";
import LabelField from "../ui/LabelField";
import InputField from "../ui/InputField";
import ButtonForm from "../ui/ButtonForm";


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

    const { mutate, isPending } = useUpdatePasswordWithToken()

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
                <LabelField htmlFor="password">
                    Contraseña
                </LabelField>
                <InputField
                    id='password'
                    type='password'
                    placeholder="Ingresar nueva contraseña"
                    register={register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener mínimo de 8 caracteres'
                        }
                    })}
                    errors={errors.password}
                />
            </div>

            <div className="mb-6">
                <LabelField htmlFor="password_confirmation">
                    Repetir contraseña
                </LabelField>
                <InputField
                    id='password_confirmation'
                    type='password'
                    placeholder='Repetir la contraseña de registro'
                    register={register('password_confirmation', {
                        required: 'Repetir la contraseña es obligatorio',
                        validate: value =>
                            value === password || 'Las contraseñas no son iguales'
                    })}
                    errors={errors.password_confirmation}
                />
            </div>

            <input
                type='submit'
                value='Establecer contraseña'
                className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
            />
            <ButtonForm isPending={isPending} loadingText="Actualizando...">
                Establecer contraseña
            </ButtonForm>
        </form>
    )

}

export default NewPasswordFormData
