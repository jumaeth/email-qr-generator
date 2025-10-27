import {z} from "zod";
import {qrFormSchema} from "@/lib/validations/qr";

export const manualSettingsFormSchema = z.object({
  qr: qrFormSchema,
  imap: z.string().min(1, { message: "Bitte eine valide Email angeben" }),
  smtp: z.string().min(1, { message: "Bitte eine valide Email angeben" }),
})

export type manualSettingsFormData = z.infer<typeof manualSettingsFormSchema>