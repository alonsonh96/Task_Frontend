import { useForm } from "react-hook-form"
import type { UpdateCurrentUserPasswordForm } from "@/types/auth"
import { useChangePasswordProfile } from "@/hooks/useProfileMutation"
import ErrorMessage from "@/components/ErrorMessage"

const ChangePasswordView = () => {

  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, 
          handleSubmit, 
          watch, 
          formState: { errors, isValid } 
        } = useForm<UpdateCurrentUserPasswordForm>({ defaultValues: initialValues })

  const password = watch('password')

  const { mutate : changePasswordMutation, isPending} = useChangePasswordProfile()

  const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => { 
    changePasswordMutation(formData)
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Contraseña</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu contraseña</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Contraseña Actual</label>
            <input
              id="current_password"
              type="password"
              placeholder="Contraseña Actual"
              className="w-full p-3  border border-gray-200"
              {...register("current_password", {
                required:'La contraseña actual es requerida',
                minLength: {
                  value: 1,
                  message: 'Ingresa tu contraseña actual'
                }
              })}
              disabled={isPending}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >Nueva Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Nueva contraseña"
              className="w-full p-3  border border-gray-200"
              {...register("password", {
                required: "La nueva contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: 'La contraseña debe ser mínimo de 8 caracteres'
                }
              })}
              disabled={isPending}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Repetir Contraseña</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir contraseña"
              className="w-full p-3  border border-gray-200"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Las contraseñas no coinciden'
              })}
              disabled={isPending}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending || !isValid}
            className="bg-slate-700 w-full p-3 text-white uppercase font-bold hover:bg-slate-600 cursor-pointer transition-colors rounded-md"
          >
            {isPending ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </>
  )
}

export default ChangePasswordView

