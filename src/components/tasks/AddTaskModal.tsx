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

    const { mutate } = useCreateTask(projectId);

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
            <div className="fixed inset-0 bg-black/60" />
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
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                    {/* Aquí iría el formulario para agregar la tarea */}
                    <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleCreateTask)}>
                        <TaskForm 
                            errors={errors} 
                            register={register}
                        />
                        <input 
                            type="submit" 
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full rounded-md p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                            value="Guardar Tarea"
                            />
                    </form>

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
