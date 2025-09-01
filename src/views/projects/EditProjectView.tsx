import { Navigate, useParams } from "react-router-dom"
import EditProjectForm from "@/components/projects/EditProjectForm";
import { ROUTE_PATHS } from "@/constants/routes";
import { useProjectById } from "@/hooks/useProjects";


const EditProjectView = () => {

  const params = useParams();
  const projectId = params.projectId!

  const { data, isLoading, isError } = useProjectById(projectId)

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to={ROUTE_PATHS.ERROR.NOT_FOUND}/>
  if(data) return <EditProjectForm data={data} projectId={projectId}/>

}

export default EditProjectView
