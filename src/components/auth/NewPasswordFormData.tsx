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
            className='space-y-8 p-10  bg-white mt-10'
            noValidate
        >
            <div className='flex flex-col gap-5'>
                <label className='font-normal text-2xl'>Password</label>

                <input
                    type='password'
                    placeholder='Contraseña de registro'
                    className='w-full p-3  border-gray-300 border'
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe ser mínimo de 8 caracteres'
                        }
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>

            <div className='flex flex-col gap-5'>
                <label className='font-normal text-2xl'>Repetir Password</label>

                <input
                    id='password_confirmation'
                    type='password'
                    placeholder='Repetir la contraseña de registro'
                    className='w-full p-3  border-gray-300 border'
                    {...register('password_confirmation', {
                        required: 'Repetir contraseña es obligatorio',
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
                className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
            />
        </form>
    )

}

export default NewPasswordFormData
