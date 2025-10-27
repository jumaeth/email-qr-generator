"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import QrForm from "@/app/(public)/mail/qr-generator/qr-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ManualSettingsForm from "@/app/(public)/mail/qr-generator/manual-settings-form";

export default function MailConfigPage() {
  const [qr, setQr] = useState("");

  const params = new URLSearchParams({
    email: "john@domain.com",
    name: "John Doe",
    imap: "mail.domain.com",
    smtp: "smtp.domain.com",
    org: "Acme Inc",
    desc: "Work Email",
  });

  const configUrl = `/api/mailconfig?${params.toString()}`;

  useEffect(() => {
    QRCode.toDataURL(`${window.location.origin}${configUrl}`, { width: 300 })
      .then(setQr)
      .catch(console.error);
  }, []);

  return (
    <Tabs defaultValue="automatic">
      <TabsList>
        <TabsTrigger value="automatic">Automatic</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="automatic">
        <Card>
          <CardHeader>
            <CardTitle>QR-Generator for Apple Mail</CardTitle>
            <CardDescription>Scan the generated QR code with your iPhone or Mac to import your mail settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <QrForm/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="manual">
        <Card>
          <CardHeader>
            <CardTitle>QR-Generator for Apple Mail</CardTitle>
            <CardDescription>Scan the generated QR code with your iPhone or Mac to import your mail settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ManualSettingsForm/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
