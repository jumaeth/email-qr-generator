"use server";

import { Resend } from "resend";
import {contactFormSchema} from "@/lib/validations/contact";
import {z} from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(values: z.infer<typeof contactFormSchema>) {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Eingaben sind invalid!"}
  }

  const {firstname, lastname, email, phone, message} = validatedFields.data;
  const customerInformation = "Additional information: <br>" +
    "phone: " + phone + "<br>";

  try {
    await resend.emails.send({
      from: "Krainerdruck: Kontaktformular <contact@mail.yuw.ch>",
      to: "mj@yuw.ch",
      subject: `Neue Nachricht von: ${firstname} ${lastname}`,
      replyTo: email,
      html: customerInformation + message,
    });

    return { success: "Email gesendet" };
  } catch (error) {
    console.error(error);
    return { error: "Fehler beim senden der Email" };
  }
}
