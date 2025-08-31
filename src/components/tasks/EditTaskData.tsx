import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/api/TaskAPI';
import EditTaskModal from './EditTaskModal';
import { ROUTE_PATHS } from '@/constants/routes';

const EditTaskData = () => {

  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTask')!;

  const { data, isError } = useQuery({
    queryKey: ['editTask', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId,
    retry:false
  })

  if(isError) return <Navigate to={ROUTE_PATHS.ERROR.NOT_FOUND}/>
  if (data) return <EditTaskModal data={data.data} taskId={taskId}/>
}

export default EditTaskData
