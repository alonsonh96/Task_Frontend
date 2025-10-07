import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ROUTE_PATHS } from "@/constants/routes";
import type { RequestConfirmationCodeForm } from "@/types/auth";
import { useRequestConfirmationCode } from "@/hooks/useAuthMutations";
import LabelField from "@/components/ui/LabelField";
import InputField from "@/components/ui/InputField";
import ButtonForm from "@/components/ui/ButtonForm";

const RequestNewCodeView = () => {

    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useRequestConfirmationCode()

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
                            },
                        })}
                        errors={errors.email}
                    />
                </div>
                <ButtonForm isPending={isPending} loadingText="Enviando..">
                    Enviar Código
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
