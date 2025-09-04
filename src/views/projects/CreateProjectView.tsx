import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ROUTE_PATHS } from "@/constants/routes";
import type { ProjectFormData } from "@/types/projects";
import { useCreateProject } from "@/hooks/useProjectMutation";
import { ArrowLeft, Plus } from "lucide-react";
import ButtonForm from "@/components/ButtonForm";

const CreateProjectView = () => {

  const initialValues : ProjectFormData= {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useCreateProject();

  const handleForm = (data : ProjectFormData) => mutation.mutate(data)

  return (
    <>
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Plus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
            Crear proyecto
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Llena el siguiente formulario para crear un nuevo proyecto y comenzar a gestionarlo de manera eficiente
          </p>
        </div>
        <div className="mb-8 flex items-start">
          <Link to={ROUTE_PATHS.HOME} className="group inline-flex cursor-pointer items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 cursor-pointer" />
            Volver a proyectos
          </Link>
        </div>
        <form
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 lg:p-12 border border-white/20"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm 
            register={register}
            errors={errors}
          />
          <ButtonForm isPending={mutation.isPending} loadingText="Creando proyecto...">
            <Plus className="w-6 h-6" />
            Crear Proyecto
          </ButtonForm>
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;
