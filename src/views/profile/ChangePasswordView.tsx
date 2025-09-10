import { useForm } from "react-hook-form"
import type { UpdateCurrentUserPasswordForm } from "@/types/auth"
import { useChangePasswordProfile } from "@/hooks/useProfileMutation"
import ErrorMessage from "@/components/ErrorMessage"
import { FileLock, LockKeyhole, Save } from "lucide-react"
import ButtonForm from "@/components/ButtonForm"

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
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center flex-row justify-center gap-3">
            <FileLock className="w-10 h-10 text-white" />
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
              Cambiar Contraseña
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Utiliza este formulario para cambiar tu contraseña
          </p>
        </div>
        

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 lg:p-12 border border-white/20"
          noValidate
        >
          <div className="space-y-2 mb-2">
            <label
              className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
              htmlFor="current_password">
                <div className="p-2 bg-green-100 rounded-lg">
                  <LockKeyhole className="w-5 h-5 text-green-600"/>
                </div>
                Contraseña Actual
            </label>
            <div className="relative">
              <input
                id="current_password"
                type="password"
                placeholder="Contraseña actual"
                className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 ${errors.current_password
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-green-500 bg-white hover:border-gray-300'
                            }`}
                {...register("current_password", {
                  required: 'La contraseña actual es requerida',
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
            
          </div>

          <div className="space-y-2 mb-2">
            <label
              className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
              htmlFor="password">
              <div className="p-2 bg-blue-100 rounded-lg">
                <LockKeyhole className="w-5 h-5 text-blue-600" />
              </div>
                Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Nueva contraseña"
                className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 ${errors.password
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'
                            }`}
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
          </div>

          <div className="space-y-2 mb-2">
            <label
              htmlFor="password_confirmation"
              className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <LockKeyhole className="w-5 h-5 text-fuchsia-600" />
              </div>
                Repetir Contraseña
            </label>
            <div className="relative">
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repetir contraseña"
                className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 ${errors.password_confirmation
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-fuchsia-500 bg-white hover:border-gray-300'
                            }`}
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
          </div>
          <ButtonForm isPending={isPending} loadingText="Actualizando contraseña...">
            <Save className="w-6 h-6" />
            Guardar cambios
          </ButtonForm>
        </form>
         
      </div>
    </>
  )
}

export default ChangePasswordView

