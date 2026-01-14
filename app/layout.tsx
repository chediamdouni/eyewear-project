import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Clevards Eyewear — Modern Clarity in Motion",
  description:
    "Clevards is a study in precision optics and quiet confidence. Eyewear crafted to sharpen how you see and how you are seen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <SmoothScroll>
          <div className="relative min-h-screen">
            <div className="noise-overlay" aria-hidden="true" />
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
