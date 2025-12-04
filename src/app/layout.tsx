import type { Metadata } from "next";
import { Cormorant_Garamond, Assistant } from "next/font/google";
import "./globals.css";

// Serif headings: Cormorant Garamond (matches mock)
const instrumentSerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Body copy: Assistant (matches mock)
const inter = Assistant({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://labcast.com.au"),
  title: "Labcast — Marketing. Creative. Build.",
  description:
    "Ecom growth from founders who actually run a brand. Marketing, creative, and build from the team behind bhm.com.au.",
  keywords: [
    "ecommerce",
    "marketing",
    "Meta ads",
    "product photography",
    "Shopify",
    "Australia",
  ],
  authors: [{ name: "Labcast" }],
  alternates: {
    canonical: "https://labcast.com.au",
  },
  openGraph: {
    title: "Labcast — Marketing. Creative. Build.",
    description: "Ecom growth from founders who actually run a brand.",
    url: "https://labcast.com.au",
    siteName: "Labcast",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Labcast — Marketing. Creative. Build.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Labcast — Marketing. Creative. Build.",
    description: "Ecom growth from founders who actually run a brand.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
