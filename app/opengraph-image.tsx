import { ImageResponse } from "next/og";

export const alt =
  "Chi-Linh (Krist) Tran — VFX Artist and Environment Generalist";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0d1015 0%, #1d2932 48%, #8c7460 100%)",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "78px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid rgba(255, 255, 255, 0.72)",
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.18em",
            padding: "12px 18px",
            textTransform: "uppercase",
          }}
        >
          Chi-Linh (Krist) Tran
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginTop: 36,
            textAlign: "center",
          }}
        >
          VFX Artist &amp; Environment Generalist
        </div>
        <div
          style={{
            color: "#d8d4cc",
            display: "flex",
            fontSize: 28,
            marginTop: 28,
            textAlign: "center",
          }}
        >
          Cinematic environments · Matte painting · Photoreal CG
        </div>
      </div>
    ),
    size,
  );
}
