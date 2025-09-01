
import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeleteProject } from '@/hooks/useProjects';

const DeleteProjectModal = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('deleteProject')!;
  const show = deleteProjectId ? true : false

    const { mutate } = useDeleteProject()

    return (
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

                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl my-5 text-center"
                                >Eliminar Proyecto</DialogTitle>

                                <p className="text-xl font-bold text-center">Confirma la eliminación del proyecto
                                </p>
                                <div className='flex flex-col justify-center md:flex-row gap-y-5 md:gap-x-10 mt-10'>
                                    <button 
                                    onClick={() => mutate(deleteProjectId)}
                                    type="button"
                                    className="bg-red-500 hover:bg-red-400 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
                                        >Eliminar
                                    </button>
                                    <button 
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                        type="button"
                                        className="bg-slate-700 hover:bg-slate-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
                                        >Cancelar
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default DeleteProjectModal