import { Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { ROUTE_PATHS } from "@/constants/routes";
import type { Project, ProjectFormData } from "@/types/projects";
import { useUpdateProject } from "@/hooks/useProjectMutation";
import ButtonForm from "../ButtonForm";
import { ArrowLeft, Plus, Save, SquarePen } from "lucide-react";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

const EditProjectForm = ({ data, projectId } : EditProjectFormProps ) => {

  const initialValues : ProjectFormData= {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useUpdateProject(projectId);

  const handleForm = (formData : ProjectFormData) => mutate({ formData, projectId });


  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center flex-row justify-center gap-3 mb-6">
            <SquarePen className="w-10 h-10 text-white" />
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
              Editar proyecto
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Actualiza la información del proyecto para mantenerlo al día y gestionarlo de manera eficiente
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
          <ProjectForm register={register} errors={errors} />
          <ButtonForm isPending={isPending} loadingText="Guardando cambios...">
            <Save className="h-6 w-6" />
            Guardar cambios
          </ButtonForm>
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
