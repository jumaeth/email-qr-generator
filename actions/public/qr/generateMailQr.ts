import QRCode from "qrcode"

interface GenerateMailQrParams {
  email: string
  name: string
  description?: string
  organization?: string
  imap?: string
  smtp?: string
  autoDetect?: boolean
}

export async function generateMailQr({
                                       email,
                                       name,
                                       description,
                                       organization,
                                       imap,
                                       smtp,
                                       autoDetect = false,
                                     }: GenerateMailQrParams) {
  if (autoDetect) {
    const res = await fetch(`/api/detect-mail?email=${encodeURIComponent(email)}`)
    const result = await res.json()

    if (!result.imap || !result.smtp) {
      throw new Error("Could not detect mail servers")
    }

    imap = result.imap
    smtp = result.smtp
  }

  if (!imap || !smtp) throw new Error("Missing IMAP or SMTP server info")

  const params = new URLSearchParams()
  params.append("email", email)
  params.append("name", name)
  params.append("imap", imap)
  params.append("smtp", smtp)
  if (description) params.append("description", description)
  if (organization) params.append("organization", organization)

  const configUrl = `${window.location.origin}/api/mailconfig?${params}`
  const qrData = await QRCode.toDataURL(configUrl, { width: 300 })

  return qrData
}
