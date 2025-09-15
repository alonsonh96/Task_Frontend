import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";
import { ROUTE_PATHS } from "@/constants/routes";
import { useGetProjects } from "@/hooks/useProjectMutation";

const DashboardView = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const { data: user } = useAuth()
  const { data: projectsList } = useGetProjects()

  if (projectsList && user)
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Mis proyectos</h1>
            <p className="text-slate-300 text-lg">Maneja y administra tus proyectos</p>
          </div>
          <nav className="my-5">
            <Link
              to={ROUTE_PATHS.PROJECTS.CREATE}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              <span className="text-xl">+</span> Nuevo Proyecto
            </Link>
          </nav>
        </div>
        {projectsList.length ? (
          <div className="flex flex-col gap-y-5">
            {projectsList.map((project) => (
              <div key={project._id} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  {isManager(project?.manager, user.data._id) ?
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                      MANAGER
                    </span> :
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                      DEVELOPER
                    </span>}
                  <Menu>
                    <MenuButton className="cursor-pointer bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 hover:text-white p-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group">
                      <span className="sr-only">opciones</span>
                      <svg className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
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
                      <MenuItems anchor="bottom end" className="absolute right-0 z-50 mt-2 w-64 origin-top-right">
                        <div className="overflow-hidden rounded-2xl bg-slate-800/95 backdrop-blur-xl shadow-2xl ring-1 ring-slate-700/50 border border-slate-600/30">
                          <div className="bg-gradient-to-r from-slate-700/30 to-slate-600/30 px-4 py-3 border-b border-slate-700/50">
                            <p className="text-slate-300 text-sm font-medium">
                              Opciones del proyecto
                            </p>
                          </div>
                          <div className="p-2">
                            <MenuItem>
                              <Link
                                to={ROUTE_PATHS.PROJECTS.DETAIL.generate(project._id)}
                                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-indigo-600/20 hover:text-white transition-all duration-200 border border-transparent hover:border-blue-500/30"
                              >
                                <div className="w-8 h-8 bg-slate-700/50 group-hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </div>
                                <span className="font-medium">Ver Proyecto</span>
                                <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </MenuItem>
                            {isManager(project?.manager, user.data._id) && (
                              <>
                                <MenuItem>
                                  <Link
                                    to={ROUTE_PATHS.PROJECTS.EDIT.generate(project._id)}
                                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 hover:text-white transition-all duration-200 border border-transparent hover:border-green-500/30"
                                  >
                                    <div className="w-8 h-8 bg-slate-700/50 group-hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                    </div>
                                    <span className="font-medium">Editar Proyecto</span>
                                    <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                </MenuItem>
                                <div className="my-2 h-px bg-slate-700/50"></div>
                                <MenuItem>
                                  <button
                                    type="button"
                                    onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                    className="group cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-pink-600/20 hover:text-white transition-all duration-200 border border-transparent hover:border-red-500/30 w-full text-left"
                                  >
                                    <div className="w-8 h-8 bg-slate-700/50 group-hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </div>
                                    <span className="font-medium">Eliminar Proyecto</span>
                                    <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </MenuItem>
                              </>
                            )}
                          </div>
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
                <Link
                  to={ROUTE_PATHS.PROJECTS.DETAIL.generate(project._id)}
                  className="text-2xl font-bold text-white mb-2">{project.projectName}</Link>
                <p className="text-blue-300 mb-4 font-medium">Cliente: {project.clientName}</p>

                <p className="text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>En progreso</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Actualizado hace 2 horas
                  </div>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <p className="text-center font-bold py-20">
            No hay proyectos aun {""}
            <Link
              to={ROUTE_PATHS.PROJECTS.CREATE}
              className="text-fuchsia-500 font-bold underline"
            >
              Crear Proyecto
            </Link>
          </p>
        )}
        <DeleteProjectModal />
      </>
    );
};

export default DashboardView;
