import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { ProjectFormData } from "@/types/projects";
import { Briefcase, FileText, User } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

const ProjectForm = ({ errors, register } : ProjectFormProps) => {
  return (
    <>
      <div className="space-y-2 mb-2">
        <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          Nombre del Proyecto
        </label>

        <div className="relative">
          <input
            id="projectName"
            className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${errors.projectName
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'
              }`}
            type="text"
            placeholder="Ej: Landing Page Corporativa"
            {...register("projectName", {
              required: "El Titulo del Proyecto es obligatorio",
            })}
          />
          {errors.projectName && (
            <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="space-y-2 mb-2">
        <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
          </div>
          Nombre del Cliente
        </label>

        <div className="relative">
          <input
            id="clientName"
            type="text"
            placeholder="Ej: Luis Ramos"
            {...register("clientName", {
              required: "El Nombre del Cliente es obligatorio",
            })}
            className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 ${errors.clientName
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus:border-green-500 bg-white hover:border-gray-300'
              }`}
          />
          {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-2">
        <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          Descripción del Proyecto
        </label>

        <div className="relative">
          <textarea
            id="description"
            rows={6}
            placeholder="Describe detalladamente el proyecto, sus objetivos, alcance y características principales..."
            {...register("description", {
              required: "Una descripción del proyecto es obligatoria",
            })}
            className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 resize-none ${errors.description
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300'
              }`}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
      </div>

    </>
  );
};

export default ProjectForm;
