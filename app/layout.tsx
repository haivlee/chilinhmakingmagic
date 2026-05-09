import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chilinhmakingmagic.com"),
  title: "Chi-Linh (Krist) Tran | VFX Artist & Digital Matte Painter",
  description:
    "Portfolio of Chi-Linh Tran, a VFX Artist, Digital Matte Painter, and Environment Concept Artist working in film and television.",
  keywords: [
    "VFX",
    "matte painting",
    "environment concept art",
    "digital art",
    "film",
  ],
  openGraph: {
    title: "Chi-Linh (Krist) Tran | VFX Artist",
    description: "Digital matte paintings and VFX work for film and television.",
    url: "https://chilinhmakingmagic.com",
    siteName: "Chi-Linh Making Magic",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-fg)]">
        {children}
      </body>
    </html>
  );
}
