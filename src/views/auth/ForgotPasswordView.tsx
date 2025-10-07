import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { ForgotPasswordForm } from "@/types/auth";
import { useForgotPassword } from "@/hooks/useAuthMutations";
import LabelField from "@/components/ui/LabelField";
import InputField from "@/components/ui/InputField";
import ButtonForm from "@/components/ui/ButtonForm";

const ForgotPasswordView = () => {

  const initialValues: ForgotPasswordForm = {
    email: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  
  const { mutate, isPending } = useForgotPassword();

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData)
    reset();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
        noValidate
      >
        <h2 className="text-2xl text-center font-semibold text-white mb-2">Reestablecer contraseña</h2>
        <p className="text-slate-400 text-center text-sm mb-8">Llena el formulario para recuperar tu cuenta</p>
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
        
        <ButtonForm isPending={isPending} loadingText="Enviando instrucciones...">
          Enviar Instrucciones
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
            Iniciar Sesión
          </Link>
        </p>
        <p className="text-center mt-3 text-slate-400 text-sm">
          ¿No tienes cuenta?{' '}
          <Link to={ROUTE_PATHS.AUTH.REGISTER} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Crear una cuenta
          </Link>
        </p>
      </form>
    </>
  )
}

export default ForgotPasswordView
