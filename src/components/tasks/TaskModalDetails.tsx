import { Fragment, useEffect } from 'react';
import { statusTranslations } from '@/locales/es';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDateTime } from '@/utils/utils';
import type { TaskStatus } from '@/types/index';

const TaskModalDetails = () => {

  const queryClient = useQueryClient();
  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!;
  const show = taskId ? true : false;

  // Validar que tanto projectId como taskId existan
  const shouldQuery = !!(projectId && taskId)

  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: shouldQuery,
    retry: false,
  })

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

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

  if (isError) return <Navigate to={`/projects/${projectId}`}/>


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
                                  <p className="text-sm text-slate-500 font-bold">Agregada el : {formatDateTime(data.data.createdAt)}</p>
                                  <p className="text-sm text-slate-500 font-bold">Última actualización : {formatDateTime(data.data.updatedAt)}</p>
                                  <DialogTitle
                                      as="h3"
                                      className="font-black text-4xl text-slate-600 my-5"
                                  >
                                      {data?.data.name}
                                  </DialogTitle>
                                  <p className="text-lg text-slate-500 mb-2">Descripción: {data?.data.description}</p>
                                  <div className="my-5 space-y-3">
                                      <label className="font-bold">Estado Actual: {statusTranslations[data.data.status]}</label>
                                      <select 
                                        onChange={handleChangeStatus}
                                        defaultValue={data?.data.status} name="" id="" className='w-full p-3 mt-1 bg-white border border-gray-400 rounded-md'>
                                        {Object.entries(statusTranslations).map(([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        ))}
                                      </select>
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
