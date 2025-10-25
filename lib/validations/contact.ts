import {z} from "zod";

export const contactFormSchema = z.object({
  firstname: z.string().min(1, { message: "Bitte einen Vornamen angeben" }),
  lastname: z.string().min(1, { message: "Bitte einen Nachnamen angeben" }),
  email: z.email().min(1, { message: "Bitte eine Email angeben" }),
  phone: z.string().min(1, { message: "Bitte eine Telefonnummer angeben" }),
  message: z.string().min(1, { message: "Bitte eine Nachricht angeben" }),
})

export type contactFormData = z.infer<typeof contactFormSchema>