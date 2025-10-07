import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { UserRegistrationForm } from "@/types/auth";
import { useCreateAccount } from "@/hooks/useAuthMutations";
import LabelField from "@/components/ui/LabelField";
import InputField from "@/components/ui/InputField";
import ButtonForm from "@/components/ui/ButtonForm";

const RegisterView = () => {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate, isPending } = useCreateAccount();

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
          <LabelField htmlFor="email">
            Correo electrónico
          </LabelField>
          <InputField
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            register={register("email", {
              required: "El correo electrónico de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico no válido",
              }
            })}
            errors={errors.email}
          />
        </div>

        <div className="mb-5">
          <LabelField htmlFor="name">
            Nombre
          </LabelField>
          <InputField
            id="name"
            type="name"
            placeholder="Nombre de registro"
            register={register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
            errors={errors.name}
          />
        </div>

        <div className="mb-5">
          <LabelField htmlFor="password">
            Contraseña
          </LabelField>
          <InputField
            id="password"
            type="password"
            placeholder="••••••••"
            register={register("password", {
              required: "La contraseña es obligatorio",
              minLength: {
                value: 8,
                message: 'La contraseña debe ser mínimo de 8 caracteres'
              }
            })}
            errors={errors.password}
          />
        </div>

        <div className="mb-5">
          <LabelField htmlFor="password_confirmation">
            Repetir contraseña
          </LabelField>
          <InputField
            id="password_confirmation"
            type="password"
            placeholder="••••••••"
            register={register("password_confirmation", {
              required: "Repetir contraseña es obligatorio",
              validate: value => value === password || 'Las contraseñas no son iguales'
            })}
            errors={errors.password_confirmation}
          />
        </div>
        <ButtonForm isPending={isPending} loadingText="Creando cuenta...">
          Registrarme
        </ButtonForm>

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
