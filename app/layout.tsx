import "./globals.css";

import type { Metadata } from "next";

import { Sidebar } from "@/components/navigation/Sidebar";

export const metadata: Metadata = {
  title: "OriginStory",
  description: "A calm, auditable portfolio and community space.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-peach">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 border-l-0 border-white/60 bg-white/80 backdrop-blur lg:border-l">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
