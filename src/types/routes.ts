export interface RouteConfig {
    path: string
    element: React.ComponentType
    roles?: string[]
    requiresAuth?: boolean
    layout?: 'app' | 'auth' | 'profile'
    meta?: {
        title?: string
        description?: string
        breadcrumb?: string
    }
}