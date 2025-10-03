import { useAddUserToProject } from '@/hooks/useTeamMutation'
import type { TeamMember } from '@/types/team'
import { CheckCircle, Mail, User, UserPlus } from 'lucide-react'
import { useParams } from 'react-router-dom'

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export const SearchResult = ({ user, reset }: SearchResultProps) => {

  const { name, _id, email } = user

  const params = useParams()
  const projectId = params.projectId!

  const { mutate, isPending } = useAddUserToProject(projectId)

  const handleAddUserToProject = () => {{
    const data = {projectId, id: _id}
    mutate(data)
    reset()
  }}

  return (
    <div className="mt-5 space-y-0 px-4 lg:px-10">
      {/* Header */}
      <div className="text-start">
        <h3 className="text-lg font-semibold text-white mb-1">Resultado :</h3>
      </div>

      {/* User Card Result */}
      <div className="text-white pb-5">
        <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-lg">
                {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </span>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Usuario :</span>
              </div>
              <h4 className="text-lg font-semibold mb-1">{name}</h4>
              <div className="flex items-center gap-1 text-sm">
                <Mail className="w-3 h-3" />
                <span>{email}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="ml-4">
            {!isPending ? (
              <button
                className={`
                  cursor-pointer flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform
                  ${isPending
                    ? 'bg-blue-500 text-white cursor-not-allowed scale-95'
                    : 'bg-slate-700 hover:bg-slate-600 text-white hover:scale-105 shadow-md hover:shadow-lg'
                  }
                `}
                onClick={handleAddUserToProject}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Agregando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Agregar al proyecto
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold">
                <CheckCircle className="w-4 h-4" />
                Agregado exitosamente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
