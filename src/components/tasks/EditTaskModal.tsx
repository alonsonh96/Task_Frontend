import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateTask } from "@/hooks/useTaskMutation";
import type { Task, TaskFormData } from "@/types/task";
import TaskForm from "./TaskForm";
import { Plus, X } from "lucide-react";
import ButtonForm from "../ButtonForm";

type EditTaskModalProps = {
    data: Task;
    taskId: Task["_id"]
}

const EditTaskModal = ({ data, taskId } : EditTaskModalProps) => {

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({ defaultValues: { name: data.name, description: data.description } });

  const { mutate, isPending } = useUpdateTask(projectId, taskId);

  const handleEditTask = (formData: TaskFormData) => {
    const data = { projectId, taskId, formData };
    mutate(data);
    reset();
  }

  return (
      <Transition appear show={true} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
              <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
              </TransitionChild>

              <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <TransitionChild
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                      >
                          <DialogPanel className="w-full max-w-2xl transform transition-all">
                              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20">
                                  <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 px-8 py-6">
                                      <div className="flex text-start justify-between">
                                          <div>
                                              <DialogTitle
                                                  as="h3"
                                                  className="text-3xl font-black text-white mb-2"
                                              >
                                                  Editar Tarea
                                              </DialogTitle>

                                              <p className="text-white/90 text-lg font-medium">Realiza cambios a una tarea en {''}
                                                  <span className="text-yellow-300 font-bold">este formulario</span>
                                              </p>
                                          </div>
                                          <button
                                              onClick={() => navigate(location.pathname, { replace: true })}
                                              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 group cursor-pointer"
                                          >
                                              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                          </button>
                                      </div>
                                  </div>
                                  <form
                                      className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 lg:p-10 border border-white/20"
                                      noValidate
                                      onSubmit={handleSubmit(handleEditTask)}
                                  >
                                      <TaskForm errors={errors} register={register} />
                                      <ButtonForm isPending={isPending} loadingText="Actualizando...">
                                          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                          Guardar
                                      </ButtonForm>
                                  </form>
                              </div>
                          </DialogPanel>
                      </TransitionChild>
                  </div>
              </div>
          </Dialog>
      </Transition>
  )
}

export default EditTaskModal
