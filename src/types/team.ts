import { z } from "zod"
import { baseApiResponseSchema } from "./base"
import { userSchema } from "./user"

export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})

export const teamMembersSchemaResponse = baseApiResponseSchema.extend({ data: z.array(teamMemberSchema)})
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>