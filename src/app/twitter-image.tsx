import { ImageResponse } from "next/og";

export const alt = "Nasif Muhammed Safeer — Technical Artist & XR Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0b",
          color: "#f4f3ef",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9a9a9f",
          }}
        >
          <span>PORTFOLIO — 2026</span>
          <span>N.S.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.02 }}>
            I build worlds.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#9a9a9f",
              fontStyle: "italic",
            }}
          >
            Nasif Muhammed Safeer — Technical Artist &amp; XR Creator
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#6fb7ff",
          }}
        >
          <span>Technical Artist</span>
          <span style={{ color: "#5ecbaa" }}>·</span>
          <span>Environment Artist</span>
          <span style={{ color: "#5ecbaa" }}>·</span>
          <span>XR Creator</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
