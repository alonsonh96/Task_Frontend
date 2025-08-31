import { useAuth } from '@/hooks/useAuth'
import { ROUTE_PATHS } from '@/constants/routes'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const { data: user, isLoading, isError } = useAuth()
  const location = useLocation()

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (isError || !user) {
        // Redirect to where the user originally wanted to go, or to HOME
        const redirectTo = location.state?.from?.pathname || ROUTE_PATHS.AUTH.LOGIN
        return <Navigate to={redirectTo} replace state={{from: location}}/>
    }
    
    return <>{children}</>
}

export default ProtectedRoute