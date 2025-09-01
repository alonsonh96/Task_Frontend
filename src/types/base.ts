import { z } from "zod"

export const baseApiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
})

export type ApiResponse = z.infer<typeof baseApiResponseSchema>