import type { Metadata, Viewport } from "next";
import { Young_Serif, Archivo, Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import { siteConfig } from "@/data/site";
import { CursorLabel } from "@/components/CursorLabel";
import { ScrollMemory } from "@/components/ScrollMemory";
import "./globals.css";

// Young Serif and Fragment Mono are single-weight faces. Nothing in the app
// pairs a weight class with `font-mono` or sets italic on the display face, so
// neither ever gets synthesised.
const display = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const mono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Amiri, subset to the eight characters in "سید کاظمی" and nothing else — 9KB
// rather than the ~100KB the full Arabic subset would cost for two words.
// `next/font/google` has no text-subsetting option, so the file is committed
// and loaded locally. See AGENTS.md for how to regenerate it.
const amiri = localFont({
  src: "./fonts/amiri-urdu-subset.woff2",
  variable: "--font-amiri",
  weight: "400",
  display: "swap",
  // The metric-matched fallback is built from Arial, which tells us nothing
  // useful about Arabic glyphs — and the name line is height-pinned anyway.
  adjustFontFallback: false,
});

const { tagline, intro, name, role, location, education } = siteConfig;

/*
 * The share card's title already reads "Syed Kazmi — Software Developer", so
 * this line does not spend itself repeating the role. The city is composed in
 * rather than written into the tagline, so there is one place to change it.
 */
const shareDescription = `${tagline} ${location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${name}`,
    template: `%s · ${name}`,
  },
  description: intro,
  authors: [{ name, url: siteConfig.url }],
  creator: name,
  keywords: [
    "Syed Kazmi",
    "Software Developer",
    "Backend Engineer",
    "Cloud",
    "AI Agents",
    "Full-Stack Developer",
    education.shortSchool,
    "Next.js",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${name} — ${role}`,
    description: shareDescription,
    siteName: name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — ${role}`,
    description: shareDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ea",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // The inline script below adds data-js to this element before React
      // hydrates, which React would otherwise report as a mismatch. Same
      // pattern the theming libraries use for their no-flash scripts.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${amiri.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          Marks the document as scripted before anything below it paints, so the
          scroll-reveal styles in globals.css can safely hide content knowing JS
          is there to bring it back. Without JS the attribute is never set and
          everything renders visible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','')`,
          }}
        />
        {children}
        <CursorLabel />
        <ScrollMemory />
      </body>
    </html>
  );
}
