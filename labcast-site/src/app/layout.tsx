import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
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
      <body className={`${instrumentSerif.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
