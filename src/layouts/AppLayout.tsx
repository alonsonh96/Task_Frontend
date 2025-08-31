import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/constants/routes";

const AppLayout = () => {

  const { data } = useAuth()

  if(data) return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex lg:flex-row justify-between items-center">
          <div className="w-64 w-">
            <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>
          <NavMenu user={data?.data}/>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center font-semibold">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default AppLayout;
