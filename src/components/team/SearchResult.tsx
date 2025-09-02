import { useAddUserToProject } from '@/hooks/useTeamMutation'
import type { TeamMember } from '@/types/team'
import { useParams } from 'react-router-dom'

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export const SearchResult = ({ user, reset }: SearchResultProps) => {

  const { name, _id } = user

  const params = useParams()
  const projectId = params.projectId!

  const { mutate } = useAddUserToProject(projectId)

  const handleAddUserToProject = () => {{
    const data = {projectId, id: _id}
    mutate(data)
    reset()
  }}

  return (
    <>
        <p className='mt-10 text-center font-bold'>Resultado:</p>
        <div className='flex justify-between items-center'>
            <p className='font-bold'>Usuario :<span className='font-normal'>{name}</span></p>
            <button 
                className='bg-slate-700 text-white hover:bg-slate-600 px-10 py-3 font-bold cursor-pointer rounded-md'
                onClick={handleAddUserToProject}
            >
                Agregar al proyecto
            </button>
        </div>
    </>
  )
}
