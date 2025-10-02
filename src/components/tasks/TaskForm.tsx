import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TaskFormData } from "@/types/task";
import { FileText, Type } from "lucide-react";
import LabelField from "../ui/LabelField";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";


type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

const TaskForm = ({ errors, register }: TaskFormProps) => {
    return (
        <>
            <div className="mb-5">
                <LabelField
                    htmlFor="name"
                    icon={<Type className="w-5 h-5 text-blue-600" />}
                >
                    Nombre de la tarea
                </LabelField>
                <InputField
                    id="name"
                    type="text"
                    placeholder="Escribe el nombre de tu tarea ..."
                    register={register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                    errors={errors.name}
                />
            </div>
            <div className="mb-5">
                <LabelField
                    htmlFor="description"
                    icon={<FileText className="w-5 h-5 text-fuchsia-600" />}
                >
                    Descripción de la tarea
                </LabelField>
                <TextAreaField
                    id="description"
                    rows={4}
                    placeholder="Describe los detalles de tu tarea ..."
                    register={register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                    errors={errors.description}
                />
            </div>
        </>
    )
}

export default TaskForm
