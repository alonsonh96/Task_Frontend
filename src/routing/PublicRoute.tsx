import { useAuth } from '@/hooks/useAuth'
import { ROUTE_PATHS } from '@/constants/routes'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {

    const { data: user, isLoading, isError  } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (user && !isError) {
        // Redirect to where the user originally wanted to go, or to HOME
        const redirectTo = location.state?.from?.pathname || ROUTE_PATHS.HOME
        return <Navigate to={redirectTo} replace  state={{from: location}}/>
    }

    return <>{children}</>
}

export default PublicRoute