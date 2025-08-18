import { z } from "zod"


export const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
})

// -- Auth Users -- //
export const authSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>


// -- Users -- //
export const userSchema = authSchema.pick({ name: true, email: true }).extend({ _id: z.string() })
export const userResponseSchema = apiResponseSchema.extend({ data: userSchema })
export type User = z.infer<typeof userSchema>

// -- Tasks -- //
export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 
export const taskResponseSchema = apiResponseSchema.extend({ data: taskSchema})


// -- Projects -- //
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true
}))
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>