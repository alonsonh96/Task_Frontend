import { AddMemberModal } from "@/components/team/AddMemberModal"
import { Link, Navigate, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import { ROUTE_PATHS } from "@/constants/routes"
import { useGetProjectTeam, useRemoveUserFromProject } from "@/hooks/useTeamMutation"
import { ArrowLeft, Mail, MoreVertical, Trash2, User } from "lucide-react"


const ProjectTeamView = () => {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useGetProjectTeam(projectId)

  const { mutate } = useRemoveUserFromProject(projectId)

  if(isLoading) return 'Cargando ...'
  if(isError) return <Navigate to={ROUTE_PATHS.ERROR.NOT_FOUND}/>

  if(data)  return (
    <>
      <h1 className='text-4xl font-bold text-white mb-2'>Administrar equipo</h1>
      <p className='text-slate-300 text-lg'>Administra el equipo de trabajo para este proyecto</p>

      <nav className='my-5 flex flex-wrap justify-center sm:justify-start gap-3'>
        <div className="flex items-start">
          <Link to={ROUTE_PATHS.PROJECTS.DETAIL.generate(projectId)}
            className="group inline-flex cursor-pointer items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 cursor-pointer" />
            Volver a proyectos
          </Link>
        </div>
        <div className="flex items-start">
          <button
            type='button'
            onClick={() => navigate(location.pathname + '?addMember=true')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer">
            <span className="text-xl">+</span> Agregar Colaborador
          </button>
        </div>
      </nav>

      <h2 className='text-4xl font-bold text-white mb-4'>Miembros actuales</h2>
      {data.length ? (
        <div className="grid gap-4">
          {data?.map((member) => (
            <div key={member._id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-white/95 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    <User/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      {/* <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                        {member.name}
                      </span> */}
                      {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {getStatusText(member.status)}
                      </span> */}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                      {/* <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Unido: {member.joinDate}</span>
                      </div> */}
                    </div>
                  </div>
                </div>

                <Menu as="div" className="relative flex-none">
                  <MenuButton className="transition-all duration-300 p-1 hover:bg-gray-300 rounded-lg  cursor-pointer">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95 translate-y-1"
                    enterTo="transform opacity-100 scale-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100 translate-y-0"
                    leaveTo="transform opacity-0 scale-95 translate-y-1"
                  >
                    <MenuItems className="absolute right-0 z-10 w-48 origin-top-right rounded-xl bg-white/95 border-1 border-gray-400 backdrop-blur-sm py-2 shadow-2xl shadow-black/10 ring-1 ring-white/20 focus:outline-none ">
                          <MenuItem as="div" className="">
                            {({ focus }) => (
                              <button
                                type="button"
                                onClick={() => mutate({ projectId, userId: member._id })}
                                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all duration-150 cursor-pointer
                                ${focus ? 'bg-red-100 text-red-600'
                                    : 'text-red-500 hover:text-red-600'}`}
                              >
                                <Trash2 className="w-4 h-4" /> Remover del equipo
                              </button>
                            )}
                          </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>

              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay miembros en el equipo</h3>
            <p className="text-gray-600 mb-4">Agrega colaboradores para comenzar a trabajar en este proyecto.</p>
          </div>
      )}
      <AddMemberModal />
    </>
    )

 }



 
  export default ProjectTeamView