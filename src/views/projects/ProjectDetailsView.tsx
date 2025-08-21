  import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
  import { useQuery } from "@tanstack/react-query";
  import { getProjectsById } from '@/api/ProjectAPI';
  import AddTaskModal from '../../components/tasks/AddTaskModal';
  import TaskList from '../../components/tasks/TaskList';
  import EditTaskData from '../../components/tasks/EditTaskData';
  import TaskModalDetails from '../../components/tasks/TaskModalDetails';
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';
import { useMemo } from 'react';

  const ProjectDetailsView = () => {

    const { data: user, isLoading: authLoading } = useAuth()

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId;
    const { data, isLoading, isError } = useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProjectsById(projectId!),
      enabled: !!projectId,
      retry: false,
    });

    const canEdit = useMemo(() => data?.manager === user?.data._id, [data, user])
    
    if (isLoading && authLoading) return "Cargando";
    if (isError) return <Navigate to="/404"/>;

    if(data && user) return (
      <>
        <h1 className='text-5xl font-black'>{data.projectName}</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>{data.description}</p>

        {isManager(data?.manager, user.data._id) && (
          <nav className='my-5 flex flex-wrap justify-center sm:justify-start gap-3'>
            <button
              type='button'
              onClick={() => navigate(location.pathname + '?newTask=true')}
              className='bg-slate-700 hover:bg-slate-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded'>
              Agregar Tarea
            </button>
            <Link
              to='team'
              className='bg-slate-700 hover:bg-slate-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded'>
              Agregar Colaborador
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
