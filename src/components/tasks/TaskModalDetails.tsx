import { Fragment, useEffect } from 'react';
import { statusTranslations } from '@/locales/es';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDateTime } from '@/utils/utils';
import { NotesPanel } from '../notes/NotesPanel';
import { ROUTE_PATHS } from '@/constants/routes';
import type { TaskStatus } from '@/types/task';
import { useTaskById, useUpdateTaskStatus } from '@/hooks/useTaskMutation';
import { Calendar, CheckCircle, Clock, ClockArrowDown, Pause, Play, X } from 'lucide-react';

const TaskModalDetails = () => {

  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!;
  const show = taskId ? true : false;

  const { data, isError, error } = useTaskById(projectId, taskId);

  const { mutate } = useUpdateTaskStatus(projectId, taskId);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus
    const data = {
      projectId,
      taskId,
      status 
    }
    mutate(data);
  }

  useEffect(() => {
  if (isError) {
    toast.error(error.message, { toastId: 'error' });
  } 
}, [isError, error]);

  if (isError) return <Navigate to={ROUTE_PATHS.PROJECTS.DETAIL.generate(projectId)}/>

  const statusOptions = {
  pending: {
    icon: <ClockArrowDown className="w-4 h-4" />,
    color: 'bg-blue-100 text-blue-600',
  },
  onHold: {
    icon: <Clock className="w-4 h-4" />,
    color: 'bg-gray-100 text-gray-600',
  },
  inProgress: {
    icon: <Play className="w-4 h-4" />,
    color: 'bg-yellow-100 text-yellow-600',
  },
  underReview: {
    icon: <Pause className="w-4 h-4" />,
    color: 'bg-purple-100 text-purple-600',
  },
  completed: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'bg-green-100 text-green-600',
  },
} as const;

  if(data) return (
      <>
          <Transition appear show={show} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                              <DialogPanel className="w-full max-w-3xl  transform text-left transition-all">
                                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20">

                                  <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 px-8 py-6">
                                    <div className="flex items-start justify-between">

                                      <div className="flex-1">
                                        <DialogTitle as="h3" className="text-2xl font-bold text-white mb-2">
                                          {data?.data.name}
                                        </DialogTitle>
                                        <p className="text-white/90 text-lg font-medium mb-4">
                                          Descripción : {data?.data.description}
                                        </p>

                                        {/* Metadatos */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                          <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar className="w-4 h-4" />
                                            <span>Agregada : {formatDateTime(data.data.createdAt)}</span>
                                          </div>
                                          <div className="flex items-center gap-2 text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            <span>Última actualización : {formatDateTime(data.data.updatedAt)}</span>
                                          </div>
                                        </div>           
                                      </div>

                                      <button 
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                        className="p-2 cursor-pointer hover:bg-white/20 rounded-lg transition-colors duration-200">
                                        <X className="w-5 h-5 text-slate-300 hover:text-white" />
                                      </button>
                                      
                                    </div>
                                  </div>

                                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col gap-y-4 px-5 py-4 lg:px-10 lg:py-4 border border-white/20">
                                    
                                    <div className="flex items-center w-full">
                                      <label className="flex items-center gap-3 font-medium text-gray-900">
                                        <Clock className="w-4 h-4 text-orange-600" />
                                        Estado Actual : 
                                      </label>
                                      <span className='font-medium text-gray-900 pl-2'>
                                        {statusTranslations[data?.data.status]}
                                      </span>
                                    </div>

                                    {data.data.completedBy.length ? (
                                      <div className='flex-1 overflow-y-auto max-h-52 pr-2
                                      [&::-webkit-scrollbar]:w-2
                                      [&::-webkit-scrollbar-track]:bg-slate-800/20
                                      [&::-webkit-scrollbar-track]:rounded-full
                                      [&::-webkit-scrollbar-thumb]:bg-slate-500/60
                                      [&::-webkit-scrollbar-thumb]:rounded-full
                                      [&::-webkit-scrollbar-thumb]:border-2
                                      [&::-webkit-scrollbar-thumb]:border-slate-900/10
                                      hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/80
                                      [&::-webkit-scrollbar-thumb]:transition-colors
                                      dark:[&::-webkit-scrollbar-thumb]:bg-slate-600/60
                                      dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/70
                                      '>
                                        <h3 className="text-lg font-medium text-gray-800">Historial de cambios</h3>
                                        {data?.data.completedBy?.map((activityLog, index) => (
                                          <div key={index} className="flex items-center p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col justify-center md:items-center md:flex-row gap-3 flex-1">

                                              <div className='flex items-center'>
                                                <span className="text-gray-600 font-medium min-w-[20px]">{index + 1}.</span>

                                                <div className={`p-2 rounded-full ${statusOptions[activityLog.status].color}`}>
                                                  {statusOptions[activityLog.status].icon}
                                                </div>

                                                <div className="">
                                                  <span className="font-medium text-gray-800">{statusTranslations[activityLog.status]} :</span>
                                                </div>
                                              </div>
                                             

                                              <span className="flex-1 text-gray-600 ml-2">{activityLog.user.name}</span>
                                              
                                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDateTime(activityLog.createdAt)}
                                              </div>

                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nuevo Estado
                                      </label>
                                      <select
                                        onChange={handleChangeStatus}
                                        defaultValue={data?.data.status} name="" id=""
                                        className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-400 rounded-xl focus:border-gray-400 focus:bg-white transition-all duration-200 outline-none">
                                        {Object.entries(statusTranslations).map(([key, value]) => (
                                          <option key={key} value={key}>
                                            {value}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    
                                    <NotesPanel notes={data.data.notes} />
                                  </div>

                                </div>
                              </DialogPanel>
                          </TransitionChild>
                      </div>
                  </div>
              </Dialog>
          </Transition>
      </>
  );
}

export default TaskModalDetails
