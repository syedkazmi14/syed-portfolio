import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `${siteConfig.name} — ${siteConfig.headline} ${siteConfig.subheadline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software Engineer`,
    template: `%s · ${siteConfig.name}`,
  },
  description,
  applicationName: `${siteConfig.name} · Workshop`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Syed Kazmi",
    "Software Engineer",
    "AI Engineer",
    "Full-Stack Developer",
    "Machine Learning",
    "Computer Vision",
    "UT Dallas",
    "Next.js",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.headline,
    siteName: `${siteConfig.name} · Workshop`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.headline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
