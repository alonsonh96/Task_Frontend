import { z } from "zod"
import { baseApiResponseSchema } from "./base"

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email()
})

export const userResponseSchema = baseApiResponseSchema.extend({ 
    data: userSchema 
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>
