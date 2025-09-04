import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/constants/routes";

const AppLayout = () => {

  const { data } = useAuth()

  if(data) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
    <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-8 py-4 shadow-2xl">
        <div className="flex justify-between items-center">
          <Link
            to={ROUTE_PATHS.HOME}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform rotate-12">
                ◆
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                PlanUp
              </span>
            </div>
          </Link>
          <NavMenu user={data?.data}/>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-8 w-full border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 font-medium">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
          <div className="flex justify-center mt-4 gap-6">
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Términos
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
};

export default AppLayout;
