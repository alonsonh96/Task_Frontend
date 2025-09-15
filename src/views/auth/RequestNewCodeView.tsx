import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { ROUTE_PATHS } from "@/constants/routes";
import type { RequestConfirmationCodeForm } from "@/types/auth";
import { useRequestConfirmationCode } from "@/hooks/useAuthMutations";

const RequestNewCodeView = () => {

    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useRequestConfirmationCode()

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
        reset()
    }

    return (
        <>
            

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
                noValidate
            >
                <h2 className="text-2xl text-center font-semibold text-white mb-2">Solicitar código de confirmación</h2>
                <p className="text-slate-400 text-center text-sm mb-8">
                    Coloca tu correo electrónico para recibir un nuevo código
                </p>
                <div className="mb-5">
                    <label
                        className="block text-slate-300 text-sm font-medium mb-2"
                        htmlFor="email"
                    >Correo electrónico</label>
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

                <input
                    type="submit"
                    value='Enviar Código'
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

export default RequestNewCodeView
