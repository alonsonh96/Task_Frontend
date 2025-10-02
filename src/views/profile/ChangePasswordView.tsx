import { useForm } from "react-hook-form"
import type { UpdateCurrentUserPasswordForm } from "@/types/auth"
import { useChangePasswordProfile } from "@/hooks/useProfileMutation"
import { FileLock, LockKeyhole, Save } from "lucide-react"
import ButtonForm from "@/components/ui/ButtonForm"
import LabelField from "@/components/ui/LabelField"
import InputField from "@/components/ui/InputField"

const ChangePasswordView = () => {

  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, 
          handleSubmit, 
          watch, 
          formState: { errors } 
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
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-20"
          noValidate
        >
          <div className="mb-5">
            <LabelField
              htmlFor="current_password"
              icon={<LockKeyhole className="w-5 h-5 text-green-600" />}
            >
              Contraseña Actual
            </LabelField>
            <InputField
              id="current_password"
              type="password"
              placeholder="Contraseña actual"
              register={register("current_password", {
                required: 'La contraseña actual es requerida',
              })}
              errors={errors.current_password}
            />
          </div>

          <div className="mb-5">
            <LabelField
              htmlFor="password"
              icon={<LockKeyhole className="w-5 h-5 text-blue-600" />}
            >
              Nueva Contraseña
            </LabelField>
            <InputField
              id="password"
              type="password"
              placeholder="Nueva contraseña"
              register={register("password", {
                required: "La nueva contraseña es obligatoria",
              })}
              errors={errors.password}
            />
          </div>

          <div className="mb-5">
            <LabelField
              htmlFor="password_confirmation"
              icon={<LockKeyhole className="w-5 h-5 text-fuchsia-600" />}
            >
              Repetir Contraseña
            </LabelField>
            <InputField
              id="password_confirmation"
              type="password"
              placeholder="Repetir contraseña"
              register={register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Las contraseñas no coinciden'
              })}
              errors={errors.password_confirmation}
            />
          </div>
          <ButtonForm 
            isPending={isPending} 
            loadingText="Actualizando contraseña..."
          >
            <Save className="w-6 h-6" />
            Guardar cambios
          </ButtonForm>
        </form>
         
      </div>
    </>
  )
}

export default ChangePasswordView

