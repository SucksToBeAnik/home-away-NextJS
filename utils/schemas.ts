import * as z from "zod"

import { ZodSchema } from "zod"


export const profileSchema = z.object({
    firstName: z.string().min(2, {
        message:"First name must at least be 2 characters"
    }),
    lastName: z.string().min(2, {
        message:"First name must at least be 2 characters"
    }),
    username: z.string().min(2, {
        message:"Username must at least be 2 characters"
    })
})