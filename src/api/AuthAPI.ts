import API from "@/lib/axios";
import { isAxiosError } from "axios";
import { userResponseSchema, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";


export async function createAccount(formData  : UserRegistrationForm) {
    try {
        const { data } = await API.post<{ message: string }>(`/auth/create-account`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function confirmAccount(formData: ConfirmToken){
    try {
        const { data } = await API.post<{message: string}>(`/auth/confirm-account`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function requestConfirmationCode(formData: RequestConfirmationCodeForm){
    try {
        const { data } = await API.post<{ message: string }>(`/auth/request-code`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function authenticateUser(formData: UserLoginForm){
    try {
        const { data } = await API.post(`/auth/login`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function forgotPassword(formData : ForgotPasswordForm){
    try {
        const { data } = await API.post(`/auth/forgot-password`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function validateToken(formData : ConfirmToken){
    try {
        const { data } = await API.post(`/auth/validate-token`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function updatePasswordWithToken({ formData, token } : { formData : NewPasswordForm, token: ConfirmToken['token']}){
    try {
        const { data } = await API.post(`/auth/update-password/${token}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function getUser(){
    try {
        const { data } = await API.get(`/auth/user`)
        const response = userResponseSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function logoutUser(){
    try {
       await API.post('auth/logout')
       return true
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}