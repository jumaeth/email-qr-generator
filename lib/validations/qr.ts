import {z} from "zod";

export const qrFormSchema = z.object({
  email: z.email().min(1, { message: "Enter a valid Email" }),
  name: z.string().min(1, { message: "Enter a name" }),
  description: z.string(),
  organization: z.string(),
})

export type qrFormData = z.infer<typeof qrFormSchema>