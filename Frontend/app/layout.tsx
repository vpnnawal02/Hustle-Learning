import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import RouteScrollTop from "./components/RouteScrollTop";
import ScrollChrome from "./components/ScrollChrome";
import StudyThemeToggle from "./components/StudyThemeToggle";
import JsonLd from "./components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display face: GT Walsheim (Trial, upright cuts only).
const walsheim = localFont({
  src: [
    {
      path: "../fonts/gt-walsheim-font-family/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/gt-walsheim-font-family/GT-Walsheim-Medium-Trial-BF651b7fc728fb3.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/gt-walsheim-font-family/GT-Walsheim-Bold-Trial-BF651b7fc737c57.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-walsheim",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hustle Learning is an EdTech platform designed to make learning accessible, interactive, and effective — NCERT solutions, notes, important questions and test prep for Classes 6–10, JEE and NEET.",
  keywords: [
    "NCERT solutions",
    "CBSE notes",
    "class 10 science",
    "JEE preparation",
    "NEET preparation",
    "Hustle Learning",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "NCERT solutions, notes, important questions, sample papers and test prep for Classes 6–10, JEE and NEET.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "NCERT solutions, notes, important questions and test prep for Classes 6–10, JEE and NEET.",
  },
};

function ThemeInitScript() {
  // Runs before first paint to avoid theme flash.
  // Dark theme is allowed ONLY on study routes (resources, materials,
  // subjects, search, class study pages, JEE/NEET). Everywhere else the
  // site stays light, regardless of any saved preference.
  const code = `(function(){var t="light";try{var p=location.pathname;var study=/^\\/(resources|materials|subjects|search|jee|neet)(\\/|$)/.test(p)||/^\\/class-\\d+(\\/|$)/.test(p);if(study){var s=localStorage.getItem("hustle-theme");t=s||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");}}catch(e){t="light";}document.documentElement.setAttribute("data-theme",t);})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${walsheim.variable} h-full antialiased`}
    >
      <head>
        <ThemeInitScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Navbar />
        <RouteScrollTop />
        <ScrollChrome />
        <StudyThemeToggle />
        {children}
        <Footer />
      </body>
    </html>
  );
}
