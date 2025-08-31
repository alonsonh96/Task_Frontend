import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { ROUTE_PATHS } from "@/constants/routes";

const LoginView = () => {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const navigate = useNavigate();
  const location = useLocation()
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Iniciando sesión')
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo, { replace: true })
    },
  })

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData)
   }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-3xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Contraseña</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-md"
        />
      </form>
      <nav className="mt-10 flex flex-col mx-auto space-y-4">
        <Link to={ROUTE_PATHS.AUTH.REGISTER} className="text-center text-gray-300 font-normal mx-auto">
          ¿No tienes cuenta?
          <span className="font-bold underline ml-0.5">Crear una</span>
        </Link>
        <Link to={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} className="text-center text-gray-300 font-normal mx-auto">
          ¿Olviaste tu contraseña?
          <span className="font-bold underline ml-0.5">Reestablecer</span>
        </Link>
      </nav>
    </>
  )
}

export default LoginView
