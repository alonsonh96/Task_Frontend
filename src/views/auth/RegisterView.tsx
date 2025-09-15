import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { UserRegistrationForm } from "@/types/auth";
import { useCreateAccount } from "@/hooks/useAuthMutations";

const RegisterView = () => {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useCreateAccount();

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData) 
    reset() 
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
        noValidate
      >
        <h2 className="text-2xl text-center font-semibold text-white mb-2">Crear Cuenta</h2>
        <p className="text-slate-400 text-center text-sm mb-8">Llena el formulario para crear tu cuenta</p>
        <div className="mb-5">
          <label
            className="block text-slate-300 text-sm font-medium mb-2"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all text-white placeholder-slate-500
            ${errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
              : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50'
            }`}
            {...register("email", {
              required: "El correo electrónico de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5">
          <label
            className="block text-slate-300 text-sm font-medium mb-2"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de registro"
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all text-white placeholder-slate-500
            ${errors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
              : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50'
            }`}
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5">
          <label
            className="block text-slate-300 text-sm font-medium mb-2"
          >Contraseña</label>

          <input
            type="password"
            placeholder="••••••••"
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all text-white placeholder-slate-500
            ${errors.password
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
              : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50'
            }`}
            {...register("password", {
              required: "La contraseña es obligatorio",
              minLength: {
                value: 8,
                message: 'La contraseña debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5">
          <label
            className="block text-slate-300 text-sm font-medium mb-2"
          >Repetir contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="••••••••"
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all text-white placeholder-slate-500
            ${errors.password_confirmation
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
              : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50'
            }`}
            {...register("password_confirmation", {
              required: "Repetir contraseña es obligatorio",
              validate: value => value === password || 'Las contraseñas no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
        />

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
        <p className="text-center mt-3 text-slate-400 text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link to={ROUTE_PATHS.AUTH.LOGIN} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Iniciar sesión
          </Link>
        </p>
        <p className="text-center mt-3 text-slate-400 text-sm">
          ¿Olviaste tu contraseña?{' '}
          <Link to={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Reestablecer
          </Link>
        </p>
      </form>
    </>
  )
}

export default RegisterView
