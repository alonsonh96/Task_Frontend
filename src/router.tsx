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

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={
                    <ProtectedRoute>
                        <AppLayout/>
                    </ProtectedRoute>
                }>
                    <Route path='/' element={<DashboardView/>} index/>
                    <Route path='/projects/create' element={<CreateProjectView/>}/>
                    <Route path='/projects/:projectId' element={<ProjectDetailsView/>}/>
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>}/>
                    <Route path='/projects/:projectId/team' element={<ProjectTeamView/>}/>
                    
                    <Route element={<ProfileLayout/>}>
                        <Route path='/profile' element={<ProfileView/>}/>
                        <Route path='/profile/password' element={<ChangePasswordView/>}/>
                    </Route>
                    
                </Route>
                <Route element={
                    <PublicRoute>
                        <AuthLayout/>
                    </PublicRoute>
                }>
                    <Route path='/auth/login' element={<LoginView/>}/>
                    <Route path='/auth/register' element={<RegisterView/>}/>
                    <Route path='/auth/confirm-account' element={<ConfirmAccoutView/>}/>
                    <Route path='/auth/request-code' element={<RequestNewCodeView/>}/>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView/>}/>
                    <Route path='/auth/new-password' element={<NewPasswordView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
