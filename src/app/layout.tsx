import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteContent } from "@/data/content";
import { siteUrl } from "@/lib/site";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: siteUrl,
    siteName: siteContent.hero.name,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.title,
    description: siteContent.meta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full bg-bg font-sans text-text antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
