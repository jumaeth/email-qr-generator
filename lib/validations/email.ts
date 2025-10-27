import {z} from "zod";

export const emailFormSchema = z.object({
  email: z.email().min(1, { message: "Bitte eine Email angeben" }),
})

export type emailFormData = z.infer<typeof emailFormSchema>