import {z} from "zod";
import {qrFormSchema} from "@/lib/validations/qr";

export const customInputFormSchema = z.object({
  qr: qrFormSchema,
  imap: z.string().min(1, { message: "Bitte eine valide Email angeben" }),
  imap_port: z.string().min(1, { message: "Bitte einen validen Port angeben" }),
  smtp: z.string().min(1, { message: "Bitte eine valide Email angeben" }),
  smtp_port: z.string().min(1, { message: "Bitte einen validen Port angeben" }),
})

export type customInputFormData = z.infer<typeof customInputFormSchema>