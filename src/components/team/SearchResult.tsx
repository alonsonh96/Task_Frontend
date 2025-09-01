import { addUserToProject } from '@/api/TeamAPI'
import type { TeamMember } from '@/types/team'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export const SearchResult = ({ user, reset }: SearchResultProps) => {

  const { name, _id } = user

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
        toast.success(data.message)
        reset()
        navigate(location.pathname, { replace: true })
        queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId]})
    }, 
    onError: (error) => {
        toast.error(error.message)
    }
  })

  const handleAddUserToProject = () => {{
    const data = {projectId, id: _id}
    mutate(data)
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
