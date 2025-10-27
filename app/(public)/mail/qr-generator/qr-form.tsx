"use client"

import {Form} from "@/components/ui/form";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {qrFormData, qrFormSchema} from "@/lib/validations/qr";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {EmailGeneratorFields} from "@/app/(public)/mail/qr-generator/email-generator-fields";
import {generateMailQr} from "@/actions/public/qr/generateMailQr";

export default function QrForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [qr, setQr] = useState("");

  async function onSubmit(data: qrFormData) {
    setIsSaving(true)
    try {
      const qrData = await generateMailQr({
        ...data,
        autoDetect: true,
      })
      setQr(qrData)
    } catch (err: any) {
      toast.error(err.message)
    }
    reset()
    setIsSaving(false)
  }

  const form = useForm<qrFormData>({
    resolver: zodResolver(qrFormSchema),
    defaultValues: {
      email: "",
      name: "",
      description: "",
      organization: "",
    },
  })
  const {reset} = form;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <EmailGeneratorFields/>
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