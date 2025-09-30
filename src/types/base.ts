import { z } from "zod"

export const baseApiResponseSchema = z.object({
    success: z.boolean(),
    messageCode: z.string(),
    statusCode: z.number()
})

export type ApiResponse = z.infer<typeof baseApiResponseSchema>