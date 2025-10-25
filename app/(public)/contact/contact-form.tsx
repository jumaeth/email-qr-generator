"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {useState} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {contactFormData, contactFormSchema} from "@/lib/validations/contact";
import {sendContactEmail} from "@/actions/public/mail/contact";

export default function ContactForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: contactFormData) {
    console.log("sent")
    setIsSaving(true);
    const result = await sendContactEmail(data);
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(result.success)
    }
    reset();
    setIsSaving(false);
  }

  const form = useForm<contactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
  })
  const { reset } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Kontakt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Vorname</FormLabel>
                      <FormControl>
                        <Input
                          id="firstname"
                          placeholder="Vorname"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nachname</FormLabel>
                      <FormControl>
                        <Input
                          id="lastname"
                          placeholder="Nachname"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Email"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder="Telefon"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Nachricht</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Nachricht"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving} className="w-full">
              {isSaving && (
                <Icons.loader2 className="mr-2 h-4 w-4 animate-spin"/>
              )}
              Senden
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}