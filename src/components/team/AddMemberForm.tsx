import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SearchResult } from "./SearchResult";
import type { TeamMemberForm } from "@/types/team";
import { useFindUserByEmail } from "@/hooks/useTeamMutation";
import ErrorMessage from "../ErrorMessage";
import ButtonForm from "../ButtonForm";
import { Mail, Search } from "lucide-react";

export const AddMemberForm = () => {

   const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useFindUserByEmail()

    const handleSearchUser = async (formData : TeamMemberForm) => {
        const data = {projectId, formData}
        mutation.mutate(data)
    }

    const resetData = () => {
        reset(),
        mutation.reset()
    }

    return (
        <>

            <form
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 lg:p-10 border border-white/20"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
                    >
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-600"/>
                        </div>E-mail de Usuario
                    </label>
                    <div className="relative group">
                        <input
                            id="name"
                            type="text"
                            placeholder="E-mail del usuario a Agregar"
                            className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                ${errors.email 
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'}`}
                            {...register("email", {
                                required: "El Email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <ButtonForm isPending={mutation.isPending} loadingText="Buscando usuario...">
                    <Search className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"/>
                    Buscar
                </ButtonForm>
            </form>

            {mutation.isPending && (<p className="mx-auto text-center mt-10">Cargando ...</p>)}
            {mutation.error && (<p className="mx-auto text-center mt-10">Usuario no encontrado</p>)}
            {mutation.data && (<SearchResult user={mutation.data.data} reset={resetData}/>)}
        </>
    )
}
