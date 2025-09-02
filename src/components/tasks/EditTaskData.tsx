import { Navigate, useLocation, useParams } from 'react-router-dom'
import EditTaskModal from './EditTaskModal';
import { ROUTE_PATHS } from '@/constants/routes';
import { useTaskById } from '@/hooks/useTaskMutation';

const EditTaskData = () => {

  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTask')!;

  const { data, isError } = useTaskById(projectId, taskId);

  if(isError) return <Navigate to={ROUTE_PATHS.ERROR.NOT_FOUND}/>
  if (data) return <EditTaskModal data={data.data} taskId={taskId}/>
}

export default EditTaskData
