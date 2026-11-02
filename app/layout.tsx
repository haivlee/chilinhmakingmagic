import type { Metadata } from "next";
import localFont from "next/font/local";

import { PortfolioTransitionProvider } from "@/components/PortfolioTransitionProvider";

import "./globals.css";

const siteUrl = "https://chilinhmakingmagic.vercel.app";
const siteName = "Chi-Linh (Krist) Tran";
const siteDescription =
  "Environment Generalist and Digital Matte Painter from HoChiMinh City, Vietnam. Cinematic environments, matte painting and photoreal CG for film, commercials and game cinematics.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chi-Linh (Krist) Tran",
  jobTitle: "VFX Artist & Environment Generalist",
  description: siteDescription,
  url: siteUrl,
  email: "chilinh2708@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "HoChiMinh City",
    addressCountry: "VN",
  },
  sameAs: [
    "https://www.facebook.com/CL.of.yesterday/",
    "https://www.linkedin.com/in/chi-linh-tran-364621139/",
    "https://chilinhtran.artstation.com/",
    "https://www.imdb.com/name/nm14247434/",
  ],
};

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
      path: "../fonts/poppins/Poppins-Thin.ttf",
      weight: "100",
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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chi-Linh (Krist) Tran | VFX Artist & Environment Generalist",
    template: "%s | Chi-Linh (Krist) Tran",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "VFX artist",
    "environment generalist",
    "digital matte painter",
    "cinematic environments",
    "photoreal CG",
    "HoChiMinh City VFX artist",
    "Vietnam digital matte painter",
    "film visual effects",
    "commercial VFX",
    "game cinematics",
  ],
  openGraph: {
    title: "Chi-Linh (Krist) Tran | VFX Artist & Environment Generalist",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi-Linh (Krist) Tran | VFX Artist & Environment Generalist",
    description: siteDescription,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PortfolioTransitionProvider>{children}</PortfolioTransitionProvider>
      </body>
    </html>
  );
}
