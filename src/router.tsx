import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import LoginView from './views/auth/LoginView'
import AuthLayout from './layouts/AuthLayout'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccoutView from './views/auth/ConfirmAccoutView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import ProtectedRoute from './routing/ProtectedRoute'
import PublicRoute from './routing/PublicRoute'
import NotFoundView from './views/notFound/NotFoundView'
import { ROUTE_PATHS } from './constants/routes'

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={
                    <ProtectedRoute>
                        <AppLayout/>
                    </ProtectedRoute>
                }>
                    <Route path={ROUTE_PATHS.HOME} element={<DashboardView/>} index/>
                    <Route path={ROUTE_PATHS.PROJECTS.CREATE} element={<CreateProjectView/>}/>
                    <Route path={ROUTE_PATHS.PROJECTS.DETAIL.path} element={<ProjectDetailsView/>}/>
                    <Route path={ROUTE_PATHS.PROJECTS.EDIT.path} element={<EditProjectView/>}/>
                    <Route path={ROUTE_PATHS.PROJECTS.TEAM} element={<ProjectTeamView/>}/>
                    
                    <Route element={<ProfileLayout/>}>
                        <Route path={ROUTE_PATHS.PROFILE.VIEW} element={<ProfileView/>}/>
                        <Route path={ROUTE_PATHS.PROFILE.PASSWORD} element={<ChangePasswordView/>}/>
                    </Route>
                    
                </Route>
                <Route element={
                    <PublicRoute>
                        <AuthLayout/>
                    </PublicRoute>
                }>
                    <Route path={ROUTE_PATHS.AUTH.LOGIN} element={<LoginView/>}/>
                    <Route path={ROUTE_PATHS.AUTH.REGISTER} element={<RegisterView/>}/>
                    <Route path={ROUTE_PATHS.AUTH.CONFIRM} element={<ConfirmAccoutView/>}/>
                    <Route path={ROUTE_PATHS.AUTH.REQUEST_CODE} element={<RequestNewCodeView/>}/>
                    <Route path={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordView/>}/>
                    <Route path={ROUTE_PATHS.AUTH.NEW_PASSWORD} element={<NewPasswordView/>}/>
                </Route>
                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    )
}
