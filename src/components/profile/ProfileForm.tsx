import { useForm } from "react-hook-form"
import type { User, UserProfileForm } from "@/types/user"
import { useUpdateProfile } from "@/hooks/useProfileMutation"
import ErrorMessage from "../ErrorMessage"
import { Mail, Save,  User as UserIcon, UserRoundPen } from "lucide-react"

import ButtonForm from "../ButtonForm"

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
                      <UserRoundPen className="w-10 h-10 text-white"/>
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
                  className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 lg:p-12 border border-white/20"
                  noValidate
              >
                  <div className="space-y-2 mb-2">
                      <label
                          className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
                          htmlFor="name">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <UserIcon className="w-5 h-5 text-green-600" />
                        </div>
                        Nombre
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          placeholder="Tu Nombre"
                          className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 ${errors.name
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-green-500 bg-white hover:border-gray-300'
                            }`}
                          {...register("name", {
                              required: "Nombre de usuario es obligatoro",
                          })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                      </div>
                  </div>

                  <div className="space-y-2 mb-2">
                      <label
                          className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
                          htmlFor="password">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-600"/>
                        </div>
                        E-mail
                      </label>
                      <div className="relative">
                        <input
                          id="text"
                          type="email"
                          placeholder="Tu Email"
                          className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 
                            ${errors.email
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'
                            }`}
                          {...register("email", {
                              required: "EL e-mail es obligatorio",
                              pattern: {
                                  value: /\S+@\S+\.\S+/,
                                  message: "E-mail no válido",
                              },
                          })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                      </div>
                      
                  </div>
                  <ButtonForm isPending={isPending} loadingText="Guardando cambios...">
                    <Save className="w-6 h-6"/>
                    Guardar cambios
                  </ButtonForm>
              </form>
          </div>
      </>
  )
}

export default ProfileForm