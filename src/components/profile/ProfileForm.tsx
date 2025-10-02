import { useForm } from "react-hook-form"
import type { User, UserProfileForm } from "@/types/user"
import { useUpdateProfile } from "@/hooks/useProfileMutation"
import { Mail, Save,  User as UserIcon, UserRoundPen } from "lucide-react"
import LabelField from "../ui/LabelField"
import InputField from "../ui/InputField"
import ButtonForm from "../ui/ButtonForm"

type ProfileFormProps = {
    data: User
}

const ProfileForm = ({ data } : ProfileFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })
  const { mutate, isPending } = useUpdateProfile()
  
  const handleEditProfile = (formData : UserProfileForm) => {
    mutate(formData)
  }

  return (
    <>
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center flex-row justify-center gap-3">
            <UserRoundPen className="w-10 h-10 text-white" />
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
              Mi Perfil
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Aquí puedes actualizar tu información
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-20"
          noValidate
        >
          <div className="mb-5">
            <LabelField 
              htmlFor="name" 
              icon={<UserIcon className="w-5 h-5 text-blue-600"/>}
            >
              Nombres
            </LabelField>
            <InputField
              id="name"
              type="text"
              placeholder="Tu nombre ..."
              register={register("name", {
                required: "El nombre es obligatoro",
              })}
              errors={errors.name}
            />
          </div>

          <div className="mb-5">
            <LabelField
              htmlFor="email"
              icon={<Mail className="w-5 h-5 text-blue-600" />}
            >
              Correo electrónico
            </LabelField>
            <InputField
              id="email"
              type="email"
              placeholder="Tu Email"
              register={register("email", {
                required: "Correo electrónico es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Correo electrónico no válido",
                }
              })}
            />
          </div>
          <ButtonForm 
            isPending={isPending} 
            loadingText="Guardando cambios..."
          >
            <Save className="w-6 h-6" />
            Guardar cambios
          </ButtonForm>
        </form>
      </div>
    </>
  )
}

export default ProfileForm