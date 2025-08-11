import API from "@/lib/axios";
import { isAxiosError } from "axios";
import { type ConfirmToken, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";


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