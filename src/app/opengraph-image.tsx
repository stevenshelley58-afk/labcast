import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Labcast — Marketing. Creative. Build.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const bg = "#fafafa";
  const fg = "#0f0f0f";
  const muted = "#6b6b6b";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          gap: "24px",
          color: fg,
          fontFamily:
            '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: muted,
            letterSpacing: "-0.01em",
          }}
        >
          From the founders of bhm.com.au
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Ecom growth.
          <br />
          <span style={{ color: muted }}>No fluff.</span>
        </div>
        <div
          style={{
            fontSize: 24,
            maxWidth: "780px",
            lineHeight: 1.4,
            color: muted,
          }}
        >
          Marketing, creative, and build — from people who spend their own money
          on ads, not yours.
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 18,
            color: fg,
            borderTop: `1px solid #e5e5e5`,
            paddingTop: 16,
          }}
        >
          <span style={{ fontWeight: 600 }}>Labcast</span>
          <span style={{ color: muted }}>Marketing · Creative · Build</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [],
    }
  );
}
