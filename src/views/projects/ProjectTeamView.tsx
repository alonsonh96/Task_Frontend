import { AddMemberModal } from "@/components/team/AddMemberModal"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"



const ProjectTeamView = () => {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

    return (
        <>
          <h1 className='text-5xl font-black'>Administrar equipo</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>Administra el equipo de trabajo para este proyecto</p>

        <nav className='my-5 flex flex-wrap justify-center sm:justify-start gap-3'>
          <button
            type='button'
            onClick={() => navigate(location.pathname + '?addMember=true')}
            className='bg-slate-700 hover:bg-slate-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded'>
            Agregar Colaborador
          </button>
          <Link
            to={`/projects/${projectId}`}
            className='bg-slate-700 hover:bg-slate-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded'>
            Regresar
          </Link>
        </nav>
        <AddMemberModal/>
        </>
    )

 }



 
  export default ProjectTeamView