import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Read all supported parameters (with defaults)
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const imapHost = searchParams.get("imap");
  const smtpHost = searchParams.get("smtp");
  const organization = searchParams.get("organization");
  const description = searchParams.get("description");

  // Optional UUIDs (for uniqueness)
  const uuidMain = uuidv4();
  const uuidMail = uuidv4();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>EmailAccountDescription</key>
      <string>${description}</string>
      <key>EmailAccountName</key>
      <string>${name}</string>
      <key>EmailAccountType</key>
      <string>EmailTypeIMAP</string>
      <key>EmailAddress</key>
      <string>${email}</string>
      <key>IncomingMailServerHostName</key>
      <string>${imapHost}</string>
      <key>IncomingMailServerUseSSL</key>
      <true/>
      <key>IncomingMailServerUsername</key>
      <string>${email}</string>
      <key>OutgoingMailServerHostName</key>
      <string>${smtpHost}</string>
      <key>OutgoingMailServerUseSSL</key>
      <true/>
      <key>OutgoingMailServerUsername</key>
      <string>${email}</string>
      <key>PayloadDescription</key>
      <string>Adds an email account</string>
      <key>PayloadDisplayName</key>
      <string>${description}</string>
      <key>PayloadIdentifier</key>
      <string>com.${organization?.toLowerCase().replace(/\s+/g, '')}.mail.${email}</string>
      <key>PayloadOrganization</key>
      <string>${organization}</string>
      <key>PayloadType</key>
      <string>com.apple.mail.managed</string>
      <key>PayloadUUID</key>
      <string>${uuidMail}</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
    </dict>
  </array>
  <key>PayloadDisplayName</key>
  <string>${description}</string>
  <key>PayloadIdentifier</key>
  <string>com.${organization?.toLowerCase().replace(/\s+/g, '')}.profile.${email}</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>${uuidMain}</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/x-apple-aspen-config",
      "Content-Disposition": `attachment; filename="email.mobileconfig"`,
    },
  });
}
