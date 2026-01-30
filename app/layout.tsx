import "./globals.css";

import type { Metadata } from "next";

import { Sidebar } from "@/components/navigation/Sidebar";
import { UserStatusBadge } from "@/components/auth/UserStatusBadge";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Explode With Me",
  description: "A calm, auditable portfolio and community space.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <div className="flex min-h-screen flex-col lg:flex-row">
            <Sidebar />
            <main className="flex flex-1 justify-center border-l-0 border-white/60 bg-white/80 px-4 py-8 transition-all duration-300 backdrop-blur lg:border-l lg:px-8">
              <div className="w-full max-w-5xl space-y-8 pb-24 lg:min-h-[calc(100vh-4rem)] lg:pb-32">
                <UserStatusBadge />
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
