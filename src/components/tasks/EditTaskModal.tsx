import { Dialog, 
    DialogPanel, 
    DialogTitle, 
    Transition, 
    TransitionChild 
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateTask } from "@/hooks/useTaskMutation";
import type { Task, TaskFormData } from "@/types/task";
import { Plus, X } from "lucide-react";
import TaskForm from "@/components/tasks/TaskForm";
import ButtonForm from "@/components/ui/ButtonForm";

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
                              <div className="relative bg-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20">
                                  <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 px-8 py-6">
                                      <div className="flex items-start justify-between">
                                          <div className="text-start">
                                              <DialogTitle
                                                  as="h3"
                                                  className="text-3xl font-black text-white"
                                              >
                                                  Editar Tarea
                                              </DialogTitle>
                                              <p className="text-slate-400 text-md">
                                                Realízale  cambios a la tarea en este formulario
                                              </p>
                                          </div>
                                          <button
                                              onClick={() => navigate(location.pathname, { replace: true })}
                                              className="p-2 cursor-pointer hover:bg-white/20 rounded-full transition-colors duration-200"
                                          >
                                              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                          </button>
                                      </div>
                                  </div>
                                  <form
                                      className="shadow-2xl p-4 lg:p-10 border border-white/20"
                                      noValidate
                                      onSubmit={handleSubmit(handleEditTask)}
                                  >
                                      <TaskForm 
                                        errors={errors} 
                                        register={register} 
                                      />
                                      <ButtonForm 
                                        isPending={isPending} 
                                        loadingText="Actualizando tarea..."
                                      >
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
