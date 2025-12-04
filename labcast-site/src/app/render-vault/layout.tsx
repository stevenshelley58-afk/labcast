import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Render Vault by Labcast",
  description: "Product imagery without production overhead.",
};

export default function RenderVaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
