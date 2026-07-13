import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zaid Ali — Backend Engineer",
  description: "Backend engineer with 4+ years building durable fintech and AI accounting systems.",
  metadataBase: new URL("https://zaidali.dev"),
  openGraph: {
    title: "Zaid Ali — Backend Engineer",
    description: "Backend engineering, product ownership, and production reliability for fintech and AI accounting.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
