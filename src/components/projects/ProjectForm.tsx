import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { ProjectFormData } from "@/types/projects";
import { Briefcase, FileText, User } from "lucide-react";
import LabelField from "../ui/LabelField";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

const ProjectForm = ({ errors, register } : ProjectFormProps) => {
  return (
    <>
      <div className="mb-5">
        <LabelField
          htmlFor="projectName"
          icon={<Briefcase className="w-5 h-5 text-blue-600" />}
        >
          Nombre del Proyecto
        </LabelField>
        <InputField
          id="projectName"
          type="text"
          placeholder="Ej: Landing Page Corporativa"
          register={register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
          errors={errors.projectName}
        />
      </div>

      <div className="mb-5">
        <LabelField
          htmlFor="clientName"
          icon={<User className="w-5 h-5 text-green-600" />}
        >
          Nombre del Cliente
        </LabelField>
        <InputField
          id="clientName"
          type="text"
          placeholder="Ej: Luis Ramos"
          register={register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
          errors={errors.clientName}
        />
      </div>

      <div className="mb-5">
        <LabelField
          htmlFor="description"
          icon={<FileText className="w-5 h-5 text-purple-600" />}
        >
          Descripción del Proyecto
        </LabelField>
        <TextAreaField
          id="description"
          rows={6}
          placeholder="Describe brevemente el proyecto"
          register={register("description", {
            required: "La Descripción del Proyecto es obligatoria",
          })}
          errors={errors.description}
        />
      </div>
    </>
  );
};

export default ProjectForm;
