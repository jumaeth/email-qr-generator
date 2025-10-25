import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import MxForm from "@/app/(public)/mail/mx-lookup/mx-form";

export default function MailConfigPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MX-Lookup for E-Mails</CardTitle>
        <CardDescription>Type your email in the field below to find out its corresponding MX server.</CardDescription>
      </CardHeader>
      <CardContent>
        <MxForm/>
      </CardContent>
    </Card>
  )
}
