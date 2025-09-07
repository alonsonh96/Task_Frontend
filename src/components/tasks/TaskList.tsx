import { statusTranslations } from "@/locales/es"
import TaskCard from "./TaskCard"
import type { Task } from "@/types/task"
import { CheckCircle2, Clock, Eye, Play, AlertCircle } from "lucide-react"


type TaskListProps = {
    tasks: Task[],
    canEdit: boolean
}

type GroupedTasks = {
    [key:string]: Task[]
}

const initialStatusGroups : GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],  
    completed: [],
}

const statusStyles = {
    pending: {
      border: 'border-t-slate-500',
      bg: 'bg-slate-50',
      icon: Clock,
      iconColor: 'text-slate-600',
      gradient: 'from-slate-100 to-slate-50'
    },
    onHold: {
      border: 'border-t-red-500',
      bg: 'bg-red-50',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      gradient: 'from-red-100 to-red-50'
    },
    inProgress: {
      border: 'border-t-blue-500',
      bg: 'bg-blue-50',
      icon: Play,
      iconColor: 'text-blue-600',
      gradient: 'from-blue-100 to-blue-50'
    },
    underReview: {
      border: 'border-t-amber-500',
      bg: 'bg-amber-50',
      icon: Eye,
      iconColor: 'text-amber-600',
      gradient: 'from-amber-100 to-amber-50'
    },
    completed: {
      border: 'border-t-emerald-500',
      bg: 'bg-emerald-50',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      gradient: 'from-emerald-100 to-emerald-50'
    }
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200'
  };

const TaskList = ({tasks, canEdit} : TaskListProps) => {

      const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

  const getTaskCount = (tasks : Task[]) => {
    return tasks.length > 0 ? tasks.length : 0;
  };

  if (tasks) return (
    <>
      <div className="flex gap-6 overflow-x-auto pb-4 
      [&::-webkit-scrollbar]:h-3 
      [&::-webkit-scrollbar-track]:bg-slate-600 
      [&::-webkit-scrollbar-thumb]:bg-slate-300 
      [&::-webkit-scrollbar-thumb]:rounded-full 
      hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => {
          const StatusIcon = statusStyles[status as Task['status']].icon;

          return (
            <div key={status} className="flex flex-col min-w-[320px] w-80 transition-all duration-300">
              <div className={`bg-white/95 backdrop-blur-sm rounded-t-xl border-t-4 ${statusStyles[status as Task['status']].border} shadow-lg`}>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${statusStyles[status as Task['status']].gradient}`}>
                        <StatusIcon className={`w-5 h-5 ${statusStyles[status as Task['status']].iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {statusTranslations[status]}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {getTaskCount(statusTasks)} tarea{statusTasks.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    {/* {canEdit && (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                    )} */}
                  </div>
                </div>
              </div>

              {/* Column Content - Scrollable */}
              <div className={`bg-white/90 backdrop-blur-sm rounded-b-xl shadow-lg flex-1 min-h-[500px] max-h-[70vh] overflow-y-auto p-4 bg-gradient-to-b
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-slate-400/80
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:border-2
                [&::-webkit-scrollbar-thumb]:border-transparent
                hover:[&::-webkit-scrollbar-thumb]:bg-slate-500
                [&::-webkit-scrollbar-thumb]:transition-all
                 ${statusStyles[status as Task['status']].gradient}`}>
                {statusTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <StatusIcon className="w-12 h-12 mb-3 opacity-30" />
                    <p className="text-sm font-medium mb-1">No hay tareas</p>
                    <p className="text-xs text-center px-4">
                      Las tareas aparecerán aquí
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {statusTasks.map((task) => (
                      <TaskCard key={task._id} task={task} canEdit={canEdit} />
                    ))}
                  </div>
                )}
              </div>


            </div>
          )
        })}
      </div>
      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {Object.entries(groupedTasks).map(([status, statusTasks]) => (
            <div key={status} className="text-white">
              <div className="text-2xl font-bold">{statusTasks.length}</div>
              <div className="text-sm text-gray-300">{statusTranslations[status]}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TaskList
