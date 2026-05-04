import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { siteConfig } from "@/lib/config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — parked domain`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "This domain is parked. If you have an idea for it, get in touch.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${siteConfig.name} — parked domain`,
    description:
      "This domain is parked. If you have an idea for it, get in touch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
