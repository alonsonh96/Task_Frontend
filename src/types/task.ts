import { z } from "zod"
import { userSchema } from "./user"
import { baseApiResponseSchema } from "./base"
import { noteSchema } from "./notes"


export const taskStatusSchema = z.enum([
    'pending', 
    'onHold', 
    'inProgress', 
    'underReview', 
    'completed'
])

export type TaskStatus = z.infer<typeof taskStatusSchema>



export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({user: userSchema , status: taskStatusSchema})),
    notes: z.array(noteSchema),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 
export const taskResponseSchema = baseApiResponseSchema.extend({ data: taskSchema})
