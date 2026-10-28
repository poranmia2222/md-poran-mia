import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poran Mia — Full-Stack Developer",
  description:
    "Full-Stack Developer building fast, production-ready web apps with Next.js, React, TypeScript and Node.js. Open to full-time roles and freelance projects — resume and contact details inside.",
  keywords: [
    "Poran Mia",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
};

// Tints the mobile browser chrome (address bar) per theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Applies the stored theme before first paint; removes the .dark
            class for explicit light prefs, defaults to dark otherwise. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme"),d=document.documentElement;if(t==="light"){d.classList.remove("dark")}}catch(e){}`,
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
