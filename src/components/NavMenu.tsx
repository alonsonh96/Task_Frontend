import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from 'react'
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { User } from "../types";
import { useLogout } from "@/hooks/useAuthMutations";

type NavMenuProps = {
  user: User
}

const NavMenu = ( { user } : NavMenuProps  ) => {

   const logoutMutation = useLogout();

  const handleLogout = () => logoutMutation.mutate()

  return (
      <Popover className="relative z-40">
        <PopoverButton className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 hover:text-white p-3 cursor-pointer rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group">
          <svg className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-1 scale-95"
        >
          <PopoverPanel anchor="bottom end" className="w-80 mt-3">
            <div className="overflow-hidden rounded-2xl bg-slate-800/95  shadow-2xl ring-1 ring-slate-700/50 border border-slate-600/30">

              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-6 py-4 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Hola, {user.name.split(" ")[0]}!
                    </p>
                    <p className="text-slate-300 text-sm">
                      Bienvenido de vuelta
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Link
                  to={ROUTE_PATHS.PROFILE.VIEW}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-indigo-600/20 hover:text-white transition-all duration-200 border border-transparent hover:border-blue-500/30"
                >
                  <div className="w-8 h-8 bg-slate-700/50 group-hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium">Mi Perfil</span>
                  <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to={ROUTE_PATHS.HOME}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-indigo-600/20 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
                >
                  <div className="w-8 h-8 bg-slate-700/50 group-hover:bg-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="font-medium">Mis Proyectos</span>
                  <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <div className="my-2 h-px bg-slate-700/50"></div>
                <button
                  onClick={handleLogout}
                  className="group cursor-pointer                                          flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-pink-600/20 hover:text-white transition-all duration-200 border border-transparent hover:border-red-500/30 w-full text-left"
                >
                  <div className="w-8 h-8 bg-slate-700/50 group-hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="font-medium">Cerrar Sesión</span>
                  <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="bg-slate-900/50 px-4 py-3 border-t border-slate-700/50">
                <p className="text-xs text-slate-400 text-center">
                  PlanUp v2.0 • {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
  );
};


export default NavMenu;