import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NavBar } from "@/components/layout/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Inn-Haven.com",
  description: "Chose your best comfort for your vacation",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressContentEditableWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="bg-secondary flex flex-col min-h-screen border-2 border-black border-solid">
            <NavBar />
            <section className="bg-gray-400 flex-grow">{children}</section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
