
import NewPasswordFormData from '@/components/auth/NewPasswordFormData'
import NewPasswordToken from '@/components/auth/NewPasswordToken'
import type { ConfirmToken } from '@/types/index'
import { useState } from 'react'

const NewPasswordView = () => {

  const [ token, setToken ] = useState<ConfirmToken['token']>('')
  const [ isValidToken, setIsValidToken ] = useState<boolean>(false)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
      {!isValidToken ? 
      <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> 
      : <NewPasswordFormData/>}
    </>
  )
}

export default NewPasswordView
