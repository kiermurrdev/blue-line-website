import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          fontFamily: "Archivo, system-ui, sans-serif",
          background: "linear-gradient(135deg, #0055A5 0%, #003D73 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Blue Line Marine Transport
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            Professional Boat Transportation Across the East Coast
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
