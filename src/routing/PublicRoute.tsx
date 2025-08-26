import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROUTE_PATHS } from '../constants/routes'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (user) {
        return <Navigate to={ROUTE_PATHS.HOME} replace />
    }

    return <>{children}</>
}

export default PublicRoute