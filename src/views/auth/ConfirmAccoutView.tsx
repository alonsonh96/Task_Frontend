import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react";
import { ROUTE_PATHS } from "@/constants/routes";
import type { ConfirmToken } from "@/types/auth";
import { useConfirmAccount } from "@/hooks/useAuthMutations";
import LabelField from "@/components/ui/LabelField";


const ConfirmAccoutView = () => {

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const { mutate } = useConfirmAccount()

    const handleChange = ( token : ConfirmToken['token']) => setToken(token)

    const handleComplete = ( token: ConfirmToken['token']) => mutate({token})

  return (
    <>
      <form
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
      >
        <h2 className="text-2xl text-center font-semibold text-white mb-2">Confirma tu Cuenta</h2>
        <p className="text-slate-400 text-center text-md mb-8">
          Ingresa el código que recibiste por correo electrónico
        </p>
        <div className="flex flex-col items-center">
          <LabelField htmlFor="token">
            Código de 6 dígitos
          </LabelField>
          <div className="flex justify-center gap-5">
              <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <PinInputField key={i} 
                    className="w-12 h-12 p-3 text-center text-2xl rounded-md bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />))}
              </PinInput>
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

        <p className="text-center mt-6 text-slate-400 text-md">
          <Link 
            to={ROUTE_PATHS.AUTH.REQUEST_CODE}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Solicitar un nuevo Código
          </Link>
        </p>
      </form>
    </>
  )
}

export default ConfirmAccoutView
