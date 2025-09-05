import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { TaskFormData } from "@/types/task";
import { FileText, Type } from "lucide-react";


type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

const TaskForm = ({ errors, register }: TaskFormProps) => {
    return (
        <div className="space-y-2">
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
                >
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Type className="w-5 h-5 text-blue-600" />
                    </div>
                    Nombre de la tarea
                </label>
                <div className="relative group">
                    <input
                        id="name"
                        type="text"
                        placeholder="Escribe el nombre de tu tarea..."
                        className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                            ${errors.name 
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'}`}
                        {...register("name", {
                            required: "El nombre de la tarea es obligatorio",
                        })}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                </div>
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="description"
                    className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3"
                >
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-fuchsia-600" />
                    </div>
                    Descripción de la tarea
                </label>
                <div className="relative group">
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Describe los detalles de tu tarea..."
                        className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none nfocus:ring-4 focus:ring-purple-500/20 resize-none
                            ${errors.description 
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300'}`}
                        {...register("description", {
                            required: "La descripción de la tarea es obligatoria"
                        })}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                </div>
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </div>
    )
}

export default TaskForm
