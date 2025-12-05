import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do — Labcast",
  description:
    "Three ways we help you grow: Marketing, Creative, and Build. Meta ads, AI product imagery, and websites that convert.",
  alternates: {
    canonical: "https://labcast.com.au/services",
  },
  openGraph: {
    title: "What We Do — Labcast",
    description:
      "Three ways we help you grow: Marketing, Creative, and Build.",
    url: "https://labcast.com.au/services",
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
    title: "What We Do — Labcast",
    description:
      "Three ways we help you grow: Marketing, Creative, and Build.",
    images: ["/twitter-image"],
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
