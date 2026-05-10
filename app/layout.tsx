import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neueMachina = localFont({
  src: [
    {
      path: "../fonts/neue-machina/NeueMachina-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/neue-machina/NeueMachina-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/neue-machina/NeueMachina-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-neue-machina",
  display: "swap",
});

const poppins = localFont({
  src: [
    {
      path: "../fonts/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
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
      className={`${neueMachina.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="min-h-full bg-[var(--color-bg)] text-[var(--color-fg)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
