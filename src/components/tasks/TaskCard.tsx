import { Fragment } from "react";
import { Menu, MenuButton, Transition, MenuItems, MenuItem} from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "@/types/task";
import { useDeleteTask } from "@/hooks/useTaskMutation";
import { Calendar, MoreVertical, User } from "lucide-react";

type TaskCardProps = {
    task: Task;
    canEdit: boolean
}

const TaskCard = ({ task, canEdit } : TaskCardProps) => {

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useDeleteTask(projectId);

  const handleDeleteTask = () => {
    const data = {
      projectId,
      taskId: task._id
    }
    mutate(data);
  }

  if (task) return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-400 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                {task.name}
              </h4>
              {/* {task.priority && (
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                    {priorityText[task.priority]}
                  </span>
              )} */}
            </div>

            <Menu as="div" className="relative flex-none">
              <MenuButton className="transition-all duration-300 p-1 hover:bg-gray-300 rounded-lg  cursor-pointer">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95 translate-y-1"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 translate-y-1"
              >
                <MenuItems className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-xl bg-white/95 backdrop-blur-sm py-2 shadow-xl shadow-black/10 ring-1 ring-white/20 focus:outline-none border border-white/20">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                        type="button"
                        className={`
                          flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all duration-150 cursor-pointer
                          ${focus  ? 'bg-blue-50 text-blue-600 translate-x-1'
                                    : 'text-gray-700 hover:text-gray-900'}`}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all duration-150
                          ${focus ? 'bg-blue-500 scale-110' : 'bg-gray-300'}`} 
                        />
                        Ver Tarea
                      </button>
                    )}
                  </MenuItem>
                  {canEdit && (
                    <>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            type="button"
                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all duration-150 cursor-pointer
                              ${focus ? 'bg-emerald-50 text-emerald-600 translate-x-1'
                                      : 'text-gray-700 hover:text-gray-900'}`}
                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                          >
                            <div className={`w-2 h-2 rounded-full transition-all duration-150
                              ${focus ? 'bg-emerald-500 scale-110' : 'bg-gray-300'}`} 
                            />
                            Editar Tarea
                          </button>
                        )}
                      </MenuItem>

                      <div className="my-1 mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                      <MenuItem>
                        {({ focus }) => (
                          <button
                            type="button"
                            onClick={handleDeleteTask}
                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all duration-150 cursor-pointer
                                ${focus ? 'bg-red-50 text-red-600 translate-x-1'
                                        : 'text-red-500 hover:text-red-600'}`}
                          >
                            <div className={`w-2 h-2 rounded-full transition-all duration-150
                                ${focus ? 'bg-red-500 scale-110' : 'bg-red-400'}`}/>
                            Eliminar Tarea
                          </button>
                        )}
                      </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Transition>
            </Menu>
          </div>

          {/* Descripción */}
          {task.description && (
            <p className="text-gray-600 text-xs mb-3 line-clamp-3">
              {task.description}
            </p>
          )}

          {/* Footer de la tarjeta */}
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {task.completedBy.length === 0
                ? 'Sin actualizaciones'
                : task.completedBy.length === 1
                ? '1 actualización'
                : `${task.completedBy.length} actualizaciones`}
            </div>
            {task.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(task.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
