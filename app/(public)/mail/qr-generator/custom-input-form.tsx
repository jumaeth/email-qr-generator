"use client"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Icons} from "@/components/icons";
import QrForm from "@/app/(public)/mail/qr-generator/qr-form";
import {customInputFormData, customInputFormSchema} from "@/lib/validations/custom-input";

export default function CustomInputForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [qr, setQr] = useState("");

  async function onSubmit(data: customInputFormData) {
    setIsSaving(true);

    reset();
    setIsSaving(false);
  }

  const form = useForm<customInputFormData>({
    resolver: zodResolver(customInputFormSchema),
    defaultValues: {
      imap: "",
      imap_port: "",
      smtp: "",
      smtp_port: "",
    },
  })
  const {reset} = form;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <QrForm/>
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <FormField
                control={form.control}
                name="imap"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>IMAP</FormLabel>
                    <FormControl>
                      <Input
                        id="imap"
                        placeholder="example.com"
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
                name="imap_port"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>PORT</FormLabel>
                    <FormControl>
                      <Input
                        id="imap_port"
                        placeholder="993"
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
                name="smtp"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>SMTP</FormLabel>
                    <FormControl>
                      <Input
                        id="smtp"
                        placeholder="example.com"
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
                name="smtp_port"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>PORT</FormLabel>
                    <FormControl>
                      <Input
                        id="smtp_port"
                        placeholder="465"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
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
        {qr && (
          <div>
            <img src={qr} alt="Mail config QR" className="border rounded-lg shadow"/>
            <Button className="w-full mt-4">
              Download
              <Icons.download className="mr-2 h-4 w-4"/>
            </Button>
          </div>
        )}
      </div>

    </>
  )
}