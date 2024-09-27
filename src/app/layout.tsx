import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/providers/auth-provider";

import ".//globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Web Clone",
  description: "Listen to your favorite music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="h-screen overflow-hidden bg-black">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
