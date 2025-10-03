import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SearchResult } from "./SearchResult";
import type { TeamMemberForm } from "@/types/team";
import { useFindUserByEmail } from "@/hooks/useTeamMutation";
import { Mail, OctagonX, Search } from "lucide-react";
import LabelField from "@/components/ui/LabelField";
import InputField from "@/components/ui/InputField";
import ButtonForm from "@/components/ui/ButtonForm";

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
                className=" backdrop-blur-sm shadow-2xl p-4 lg:p-10 border border-white/20"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="mb-5">
                    <LabelField
                        htmlFor="email"
                        icon={<Mail className="w-5 h-5 text-blue-600"/>}
                    >
                        Correo electrónico del usuario
                    </LabelField>
                    <InputField
                        id="email"
                        type="email"
                        placeholder="Correo electrónico del usuario a agregar"
                        register={register("email", {
                            required: "Ingrese un correo electrónico",
                            pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Correo electrónico no válido",
                            },
                        })}
                        errors={errors.email}
                    />
                </div>
                <ButtonForm isPending={mutation.isPending} loadingText="Buscando usuario ...">
                    <Search className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"/>
                    Buscar
                </ButtonForm>
            </form>

            {mutation.error && (
                <p className="flex items-center justify-center gap-2 mx-auto text-center text-white mt-5 mb-5">
                    <OctagonX className="w-4 h-4 text-red-600"/>
                    No se encontró al usuario
                </p>)}
            {mutation.data && (<SearchResult user={mutation.data.data} reset={resetData}/>)}
        </>
    )
}
