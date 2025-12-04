import { redirect } from "next/navigation";

export default function RenderVaultHome() {
  // Keep the application routes under /render-vault/(app) as-is,
  // but treat the marketing landing at /render-vault the same as
  // any other Labcast marketing page by redirecting to /rendervault.
  redirect("/rendervault");
}
