import Hero from "./Hero";
import Features from "./Features";
import CTA from "./CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cura - Hospital Management System",
  description:
    "Cura, meaning 'care' in Latin, is an all-in-one Hospital Management System. Streamline appointments, manage records, and enhance patient care for both patients and staff.",
  keywords: [
    "hospital management",
    "healthcare",
    "appointments",
    "patient records",
    "staff portal",
    "AI scheduling",
    "chatbot",
  ],
  authors: [{ name: "Ebijuni Abraham" }],
  openGraph: {
    title: "Cura - Hospital Management System",
    description:
      "Cura, meaning 'care' in Latin, is an all-in-one Hospital Management System. Streamline appointments, manage records, and enhance patient care for both patients and staff.",
    type: "website",
    url: "https://your-vercel-url.vercel.app/",
    images: [
      {
        url: "https://your-vercel-url.vercel.app/og-image.jpg",
        alt: "Cura Hospital Management System",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Cura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cura - Hospital Management System",
    description:
      "Cura, meaning 'care' in Latin, is an all-in-one Hospital Management System. Streamline appointments, manage records, and enhance patient care.",
    images: [
      {
        url: "https://your-vercel-url.vercel.app/og-image.jpg",
        alt: "Cura Hospital Management System",
      },
    ],
    creator: "@YourTwitterHandle", // Replace with your Twitter handle
  },
  icons: {
    icon: "/favicon.ico", // Assumes you have a favicon in public/
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
