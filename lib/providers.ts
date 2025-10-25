export const KNOWN_PROVIDERS: Record<string, { imap: string; smtp: string }> = {
  "bluewin.ch": {
    imap: "imaps.bluewin.ch",
    smtp: "smtpauths.bluewin.ch",
  },
  "sio.ch": {
    imap: "mx02.arwio.ch",
    smtp: "mx02.arwio.ch",
  },
  "gmail.com": {
    imap: "imap.gmail.com",
    smtp: "smtp.gmail.com",
  },
  "outlook.com": {
    imap: "outlook.office365.com",
    smtp: "smtp.office365.com",
  },
  "hotmail.com": {
    imap: "outlook.office365.com",
    smtp: "smtp.office365.com",
  },
};