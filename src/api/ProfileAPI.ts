import { isAxiosError } from "axios";
import API from "@/lib/axios";
import type { ApiResponse, UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";


export async function updateProfile(formData : UserProfileForm) {
    try {
       const { data } = await API.put<ApiResponse>('/auth/profile', formData)
       return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function changePassword(formData : UpdateCurrentUserPasswordForm) {
    try {
       const { data } = await API.post<ApiResponse>('/auth/update-password', formData)
       return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}