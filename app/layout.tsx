import "@styles/globals.css";

import Script from "next/script";
import type { Viewport, Metadata } from "next";
import localFont from "next/font/local";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@lib/utils";
import { siteConfig } from "@config/site";

import { Toaster } from "@/components/ui/Toaster";
import { Analytics } from "@component/config/Analytics";
import GeistProviderUI from "@component/config/GeistProviderUI";
import { TailwindIndicator } from "@component/config/TailwindIndicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Uniswap v4 Hooks Directory",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Uniswap",
    "Uniswap v4",
    "Uniswap v4 hooks",
    "Uniswap v4 examples",
    "Uniswap v4 blogs",
    "Community",
    "Hooks",
    "Examples",
  ],
  authors: [
    {
      name: "Aiden",
      url: "https://github.com/0xaaiden",
    },
  ],
  creator: "0xaaiden",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [`${siteConfig.url}/og.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@aiden0x4",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_KEY}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_KEY}');
        `}
      </Script>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <GeistProviderUI>{children}</GeistProviderUI>
        <Toaster />
        <Analytics />
        <TailwindIndicator />
      </body>
    </html>
  );
}
