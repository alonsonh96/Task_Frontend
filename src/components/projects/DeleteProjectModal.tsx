import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeleteProject, useProjectById } from '@/hooks/useProjectMutation';

const DeleteProjectModal = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('deleteProject')!;
  const show = deleteProjectId ? true : false

    const { mutate, isPending } = useDeleteProject()
    const { data  } = useProjectById(deleteProjectId)

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
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full  items-center justify-center max-w-md mx-auto p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
                                <div className='p-8 text-center'>
                                    <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                    <DialogTitle as="h3"
                                        className="text-2xl font-bold text-white mb-3">
                                        Eliminar Proyecto
                                    </DialogTitle>
                                    <p className="text-slate-400 mb-4">
                                        Confirma la eliminación del proyecto
                                    </p>
                                    {/* Nombre del proyecto */}
                                    <p className="text-slate-300 font-medium mb-8 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
                                        "{data?.projectName}"
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => mutate(deleteProjectId)}
                                            disabled={isPending}
                                            type="button"
                                            className="cursor-pointer bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 min-w-[120px] flex items-center justify-center"
                                        >
                                            {isPending ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Eliminando...</span>
                                                </div>
                                            ) : (
                                                'Eliminar'
                                            )}
                                        </button>
                                        <button
                                            onClick={() => navigate(location.pathname, { replace: true })}
                                            type="button"
                                            className="cursor-pointer bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 min-w-[120px]"
                                        >Cancelar
                                        </button>
                                    </div>
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