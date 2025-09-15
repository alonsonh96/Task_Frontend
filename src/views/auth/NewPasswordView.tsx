
import NewPasswordFormData from '@/components/auth/NewPasswordFormData'
import NewPasswordToken from '@/components/auth/NewPasswordToken'
import type { ConfirmToken } from '@/types/auth'
import { useState } from 'react'

const NewPasswordView = () => {

  const [ token, setToken ] = useState<ConfirmToken['token']>('')
  const [ isValidToken, setIsValidToken ] = useState<boolean>(false)

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
      <h2 className="text-2xl text-center font-semibold text-white mb-2">Reestablecer contraseña</h2>
      <p className="text-slate-400 text-center text-md mb-8">
        Ingresa el codigo que recibiste por correo electrónico
      </p>
      {!isValidToken ? 
      <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> 
      : <NewPasswordFormData token={token}/>}
    </div>
  )
}

export default NewPasswordView
