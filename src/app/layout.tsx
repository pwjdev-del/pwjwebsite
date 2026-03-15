import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LocalBusinessSchema } from "@/components/seo/JsonLd";
import { defaultMetadata } from "@/data/seo";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  openGraph: {
    title: defaultMetadata.title.default,
    description: defaultMetadata.description,
    url: "https://purewavejosh.com", 
    siteName: "Purewave Josh LLC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purewave Josh LLC | AI Automation",
    description: defaultMetadata.description,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-navy-100 bg-obsidian-900 selection:bg-magenta-500 selection:text-white`}>
        <LocalBusinessSchema />
        <div className="min-h-screen flex flex-col pt-16 md:pt-20">
          <header>
            <Navbar />
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
