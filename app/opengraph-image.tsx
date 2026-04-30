import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Quest Club — Tu grupo de amigos contra el mundo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Dot pattern decorativo en esquinas (estático, ImageResponse no anima) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div
          style={{
            fontSize: 22,
            color: "#84cc16",
            textTransform: "uppercase",
            letterSpacing: 6,
            marginBottom: 24,
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          Lanzamiento verano 2026
        </div>

        <div
          style={{
            fontSize: 96,
            color: "#fafafa",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.0,
            letterSpacing: -3,
            zIndex: 1,
          }}
        >
          Tu grupo de amigos
        </div>
        <div
          style={{
            fontSize: 96,
            color: "#84cc16",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.0,
            letterSpacing: -3,
            marginTop: 8,
            zIndex: 1,
          }}
        >
          contra el mundo.
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 26,
            color: "#a3a3a3",
            display: "flex",
            gap: 20,
            zIndex: 1,
          }}
        >
          <span>🏖 Verano</span>
          <span>·</span>
          <span>🎃 Halloween</span>
          <span>·</span>
          <span>🎄 Navidad</span>
          <span>·</span>
          <span>💔 San Valentín</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 64,
            fontSize: 20,
            color: "#525252",
            zIndex: 1,
          }}
        >
          questclub.app
        </div>
      </div>
    ),
    { ...size }
  );
}
