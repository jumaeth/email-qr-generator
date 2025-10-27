"use client"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Icons} from "@/components/icons";
import {Card} from "@/components/ui/card";
import {emailFormData, emailFormSchema} from "@/lib/validations/email";

export default function MxForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [imap, setImap] = useState("");
  const [smtp, setSmtp] = useState("");

  async function onSubmit(data: emailFormData) {
    setIsSaving(true);
    const res = await fetch(`/api/detect-mail?email=${encodeURIComponent(data.email)}`);
    const result = await res.json();

    if (result.imap && result.smtp) {
      setImap(result.imap);
      setSmtp(result.smtp);
    } else {
      toast.error("Could not detect mail servers")
    }
    reset();
    setIsSaving(false);
  }

  const form = useForm<emailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  })
  const {reset} = form;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="me@example.com"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSaving} className="w-full mt-4">
            {isSaving && (
              <Icons.loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Generate
            <Icons.start className="mr-2 h-4 w-4"/>
          </Button>
        </form>
      </Form>
      <div className="flex justify-center mt-10">
        <Card>
          <div className="grid grid-cols-1 px-6 gap-4">
            {imap && (
              <div className="flex justify-between gap-6">
                <div>
                  <h3 className="font-bold">IMAP</h3>
                  <p>{imap}</p>
                </div>
                <div>
                  <h3 className="font-bold">PORT</h3>
                  <p>993</p>
                </div>
              </div>
            )}
            {smtp && (
              <div className="flex justify-between gap-6">
                <div>
                  <h3 className="font-bold">SMTP</h3>
                  <p>{smtp}</p>
                </div>
                <div>
                  <h3 className="font-bold">PORT</h3>
                  <p>465</p>
                </div>
              </div>
            )}
            <p className="text-muted-foreground max-w-[400px]">* The MX lookup results are provided for convenience only and may not always be accurate or up to date.</p>
          </div>
        </Card>
      </div>
    </>
  )
}