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
          <main className="flex flex-1 justify-center border-l-0 border-white/60 bg-white/80 px-4 py-8 transition-all duration-300 backdrop-blur lg:border-l lg:px-10">
            <div className="w-full max-w-5xl space-y-8 lg:min-h-[calc(100vh-4rem)]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
