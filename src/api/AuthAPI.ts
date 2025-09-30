import API from "@/lib/axios";
import { hanldeApiError } from "@/lib/axios-helpers";
import type { 
    ConfirmToken, 
    ForgotPasswordForm, 
    NewPasswordForm, 
    RequestConfirmationCodeForm, 
    UserLoginForm, 
    UserRegistrationForm 
} from "@/types/auth";
import { userResponseSchema } from "@/types/user";

export async function createAccount(formData  : UserRegistrationForm) {
    try {
        const { data } = await API.post<{ message: string }>(`/auth/create-account`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function confirmAccount(formData: ConfirmToken){
    try {
        const { data } = await API.post<{message: string}>(`/auth/confirm-account`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function requestConfirmationCode(formData: RequestConfirmationCodeForm){
    try {
        const { data } = await API.post<{ message: string }>(`/auth/request-code`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function authenticateUser(formData: UserLoginForm){
    try {
        const { data } = await API.post(`/auth/login`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function forgotPassword(formData : ForgotPasswordForm){
    try {
        const { data } = await API.post(`/auth/forgot-password`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function validateToken(formData : ConfirmToken){
    try {
        const { data } = await API.post(`/auth/validate-token`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function updatePasswordWithToken({ formData, token } : { formData : NewPasswordForm, token: ConfirmToken['token']}){
    try {
        const { data } = await API.post(`/auth/update-password/${token}`, formData)
        return data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function getUser(){
    try {
        const { data } = await API.get(`/auth/user`)
        const response = userResponseSchema.safeParse(data)
        return response.data
    } catch (error) {
        hanldeApiError(error)
    }
}


export async function logoutUser(){
    try {
       await API.post('auth/logout')
       return true
    } catch (error) {
        hanldeApiError(error)
    }
}