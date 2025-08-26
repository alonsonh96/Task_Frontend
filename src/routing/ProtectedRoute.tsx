import { useAuth } from '@/hooks/useAuth'
import { ROUTE_PATHS } from '../constants/routes'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const { data: user, isLoading } = useAuth()

  if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />
    }
    
    return <>{children}</>
}

export default ProtectedRoute