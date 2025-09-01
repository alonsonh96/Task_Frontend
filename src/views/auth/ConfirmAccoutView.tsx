import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react";
import { ROUTE_PATHS } from "@/constants/routes";
import type { ConfirmToken } from "@/types/auth";
import { useConfirmAccount } from "@/hooks/useAuthMutations";


const ConfirmAccoutView = () => {

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const { mutate } = useConfirmAccount()

    const handleChange = ( token : ConfirmToken['token']) => setToken(token)

    const handleComplete = ( token: ConfirmToken['token']) => mutate({token})

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 rounded-md border-gray-500 border placeholder-white text-center font-bold"></PinInputField>
                <PinInputField className="w-10 h-10 p-3 rounded-md border-gray-500 border placeholder-white text-center font-bold"></PinInputField>
                <PinInputField className="w-10 h-10 p-3 rounded-md border-gray-500 border placeholder-white text-center font-bold"></PinInputField>
                <PinInputField className="w-10 h-10 p-3 rounded-md border-gray-500 border placeholder-white text-center font-bold"></PinInputField>
                <PinInputField className="w-10 h-10 p-3 rounded-md border-gray-500 border placeholder-white text-center font-bold"></PinInputField>
                <PinInputField className="w-10 h-10 p-3 rounded-md border-gray-500 border placeholder-white text-center font-bold"></PinInputField>
            </PinInput>
        </div>

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={ROUTE_PATHS.AUTH.REQUEST_CODE}
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}

export default ConfirmAccoutView
