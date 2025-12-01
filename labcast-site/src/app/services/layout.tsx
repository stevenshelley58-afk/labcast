import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Packages — Labcast",
  description:
    "No retainers that bleed you dry. No scope creep. Just clear deliverables, hard numbers, and real accountability. Six packages. No fluff.",
  alternates: {
    canonical: "https://labcast.com.au/services",
  },
  openGraph: {
    title: "Services & Packages — Labcast",
    description:
      "No retainers that bleed you dry. No scope creep. Just clear deliverables, hard numbers, and real accountability.",
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
    title: "Services & Packages — Labcast",
    description:
      "No retainers that bleed you dry. No scope creep. Just clear deliverables, hard numbers, and real accountability.",
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
