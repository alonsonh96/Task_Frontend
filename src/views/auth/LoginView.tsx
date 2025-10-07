import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { UserLoginForm } from "@/types/auth";
import { useLogin } from "@/hooks/useAuthMutations";
import LabelField from "@/components/ui/LabelField";
import InputField from "@/components/ui/InputField";

const LoginView = () => {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useLogin()

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData)
   }

  return (
    <>
      <form 
        onSubmit={handleSubmit(handleLogin)}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
        noValidate
      >
        <h2 className="text-2xl text-center font-semibold text-white mb-2">Iniciar Sesión</h2>
        <p className="text-slate-400 text-center text-sm mb-8">Maneja y administra tus proyectos</p>
        {/* Email Field */}
        <div className="mb-5">
          <LabelField htmlFor="email">
            Correo electrónico
          </LabelField>

          <InputField
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            register={register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico no válido",
              },
            })}
            errors={errors.email}
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <LabelField htmlFor="password">
            Contraseña
          </LabelField>
          <InputField
            id="password"
            type="password"
            placeholder="••••••••"
            register={register("password", {
              required: "La contraseña es obligatoria",
            })}
            errors={errors.password}
          />
        </div>
        
        <div className="flex justify-end mb-8">
          <Link to={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <input
          type="submit"
          value='Iniciar Sesión'
          className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
          />

        {/* Status indicator like your "En progreso" */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-500">Servidor activo</span>
          </div>
        </div>
        
        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-slate-800/50 text-slate-500">O</span>
          </div>
        </div>

        {/* Sign up link */}
          <p className="text-center mt-6 text-slate-400 text-sm">
            ¿No tienes cuenta?{' '}
            <Link to={ROUTE_PATHS.AUTH.REGISTER} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Crear una cuenta
            </Link>
          </p> 
      </form>
    </>
  )
}

export default LoginView
