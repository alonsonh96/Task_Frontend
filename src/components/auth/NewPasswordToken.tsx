import { ROUTE_PATHS } from '@/constants/routes';
import { useValidateToken } from '@/hooks/useAuthMutations';
import type { ConfirmToken } from '@/types/auth';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';

type NewPasswordTokenProps = {
    token: ConfirmToken['token'],
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPasswordToken = ( { token, setToken, setIsValidToken } : NewPasswordTokenProps ) => {

    const { mutate } = useValidateToken(setIsValidToken)

    const handleChange = (token: ConfirmToken['token']) => setToken(token)

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

  return (
    <>
        <form className="flex flex-col items-center">
            <label className="block text-slate-300 text-md font-medium mb-4">
                Código de 6 dígitos
            </label>
            <div className="flex justify-center gap-5">
              <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <PinInputField key={i} 
                    className="w-12 h-12 p-3 text-center text-2xl rounded-md bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />))}
              </PinInput>
            </div>

            {/* Divider */}
            <div className="relative my-6 w-full">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-slate-800/50 text-slate-500">O</span>
                </div>
            </div>
            
              <p className="text-center  text-slate-400 text-md">
                  <Link
                      to={ROUTE_PATHS.AUTH.FORGOT_PASSWORD}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Solicitar un nuevo Código
                  </Link>
              </p>
        </form>
    </>
  )
}

export default NewPasswordToken
