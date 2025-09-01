import { validateToken } from '@/api/AuthAPI';
import { ROUTE_PATHS } from '@/constants/routes';
import type { ConfirmToken } from '@/types/auth';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken['token'],
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPasswordToken = ( { token, setToken, setIsValidToken } : NewPasswordTokenProps ) => {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            setIsValidToken(true)
        },
    })

    const handleChange = (token: ConfirmToken['token']) => setToken(token)

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

  return (
    <>
        <form className='space-y-8 p-10 rounded-lg bg-white mt-10'>
            <label className='font-normal text-2xl text-center block'>
                Código de 6 dígitos
            </label>
            <div className='flex justify-center gap-5'>
                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-600 border placeholder-white text-center font-bold' />
                    <PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-600 border placeholder-white text-center font-bold' />
                    <PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-600 border placeholder-white text-center font-bold' />
                    <PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-600 border placeholder-white text-center font-bold' />
                    <PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-600 border placeholder-white text-center font-bold' />
                    <PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-600 border placeholder-white text-center font-bold' />
                </PinInput>
            </div>
        </form>
        <nav className='mt-10 flex flex-col space-y-4'>
            <Link
                to={ROUTE_PATHS.AUTH.FORGOT_PASSWORD}
                className='text-center text-gray-300 font-normal'
            >
                Solicitar un nuevo Código
            </Link>
        </nav>
    </>
  )
}

export default NewPasswordToken
