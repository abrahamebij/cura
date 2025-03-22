"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// export const metadata: Metadata = {
//   title: "Cura",
//   description:
//     "This is a health care management application for patients and doctors.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${interFont.variable} antialiased`}>
          <Toaster position="top-right" richColors />

          <NextTopLoader easing="ease" color="#007bff" height={4} />
          <Navbar />
          {children}
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
