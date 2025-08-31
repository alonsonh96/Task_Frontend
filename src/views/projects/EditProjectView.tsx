import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectsById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { ROUTE_PATHS } from "@/constants/routes";


const EditProjectView = () => {

  const params = useParams();
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectsById(projectId),
    retry: false
  })

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to={ROUTE_PATHS.ERROR.NOT_FOUND}/>
  if(data) return <EditProjectForm data={data} projectId={projectId}/>

}

export default EditProjectView
