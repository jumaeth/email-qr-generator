"use client"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {qrFormData, qrFormSchema} from "@/lib/validations/qr";
import {toast} from "sonner";
import QRCode from "qrcode";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Icons} from "@/components/icons";

export default function QrForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [qr, setQr] = useState("");

  async function onSubmit(data: qrFormData) {
    setIsSaving(true);
    const res = await fetch(`/api/detect-mail?email=${encodeURIComponent(data.email)}`);
    const result = await res.json();

    if (result.imap && result.smtp) {

      const params = new URLSearchParams({
        email: data.email,
        name: data.email.split("@")[0],
        imap: result.imap,
        smtp: result.smtp
      });
      const configUrl = `${window.location.origin}/api/mailconfig?${params}`;
      const qrData = await QRCode.toDataURL(configUrl, {width: 300});
      setQr(qrData);
    } else {
      toast.error("Could not detect mail servers")
    }
    reset();
    setIsSaving(false);
  }

  const form = useForm<qrFormData>({
    resolver: zodResolver(qrFormSchema),
    defaultValues: {
      email: "",
      name: "",
      description: "",
    },
  })
  const {reset} = form;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="John Doe"
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
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      placeholder="Work Email"
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