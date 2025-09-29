import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import AddTaskModal from '@/components/tasks/AddTaskModal';
import TaskList from '@/components/tasks/TaskList';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';
import { useMemo } from 'react';
import { ROUTE_PATHS } from '@/constants/routes';
import { useProjectById } from '@/hooks/useProjectMutation';

  const ProjectDetailsView = () => {

    const { data: user, isLoading: authLoading } = useAuth()

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId;

    const { data, isLoading, isError } = useProjectById(projectId!);

    const canEdit = useMemo(() => data?.manager === user?.data._id, [data, user])
    
    if (isLoading && authLoading) return "Cargando";
    if (isError) return <Navigate to={ROUTE_PATHS.ERROR.NOT_FOUND}/>;

    if(data && user) return (
      <>
        <h1 className='text-4xl font-bold text-white mb-2'>{data.projectName}</h1>
        <p className='text-slate-300 text-lg'>{data.description}</p>

        {isManager(data?.manager, user.data._id) && (
          <nav className='my-5 flex flex-wrap justify-center sm:justify-start gap-3'>
            <button
              type='button'
              onClick={() => navigate(location.pathname + '?newTask=true')}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              <span className="text-xl">+</span> Agregar Tarea
            </button>
            <Link
              to='team'
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              <span className="text-xl">+</span> Agregar Colaborador
            </Link>
          </nav>
        )}
        <TaskList tasks={data.tasks} canEdit={canEdit}/>
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    )
  }

  export default ProjectDetailsView
