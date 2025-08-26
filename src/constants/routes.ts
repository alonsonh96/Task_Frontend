export const ROUTE_PATHS = {
    HOME: '/',
    PROJECTS: {
        CREATE: '/projects/create',
        DETAIL: '/projects/:projectId',
        EDIT: '/projects/:projectId/edit',
        TEAM: '/projects/:projectId/team', 
    },
    PROFILE: {
        VIEW: '/profile',
        PASSWORD: '/profile/password'
    },
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        CONFIRM: '/auth/confirm-account',
        REQUEST_CODE: '/auth/request-code',
        FORGOT_PASSWORD: '/auth/forgot-password',
        NEW_PASSWORD: '/auth/new-password',
    },
    ERROR: {
        NOT_FOUND: '/404',
    }
}