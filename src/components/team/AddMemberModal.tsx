import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddMemberForm } from './AddMemberForm';
import { X } from 'lucide-react';

export const AddMemberModal = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('addMember');
    const show = !!addMember

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
                                                    <DialogTitle
                                                        as="h3"
                                                        className="text-3xl font-black text-white mb-2"
                                                    >
                                                        Nuevo integrante
                                                    </DialogTitle>
                                                    <p className="text-white/90 text-lg font-medium">Busca el nuevo integrante por email {''}
                                                        <span className="text-yellow-300 font-bold">para agregarlo al proyecto</span>
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


                                        <AddMemberForm />
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
