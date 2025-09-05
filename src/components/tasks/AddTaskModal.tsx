import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "@/types/task";
import { useCreateTask } from "@/hooks/useTaskMutation";
import TaskForm from "../tasks/TaskForm";
import ButtonForm from "../ButtonForm";
import { Plus, X } from "lucide-react";

const AddTaskModal = () => {

    const navigate = useNavigate();
    // Logic to get the query parameters from the URL
    // Assuming the URL is something like /projects/123?newTask=true
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    // Get the project ID from the URL parameters
    const params = useParams();
    const projectId = params.projectId!

    const initialValues : TaskFormData = {
        name: "",
        description: "",
    };

    const { mutate, isPending } = useCreateTask(projectId);

    const { register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({ defaultValues: initialValues });

    const handleCreateTask = (formData: TaskFormData) => {
      const data = {
        formData,
        projectId
      }
        mutate(data);
        reset();
    }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
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
                          <DialogTitle as="h3" className="text-3xl font-black text-white mb-2">
                            Nueva Tarea
                          </DialogTitle>
                          <p className="text-white/90 text-lg font-medium">
                            Llena el formulario y crea{" "}
                            <span className="text-yellow-300 font-bold">una tarea</span>
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

                    {/* Aquí iría el formulario para agregar la tarea */}
                    <form className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 lg:p-10 border border-white/20" noValidate onSubmit={handleSubmit(handleCreateTask)}>
                        <TaskForm 
                            errors={errors} 
                            register={register}
                        />
                        <ButtonForm isPending={isPending} loadingText="Guardando tarea...">
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
    </>
  )
}

export default AddTaskModal
