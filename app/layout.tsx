import type { Metadata } from "next";
import { Space_Grotesk, Inter, Outfit } from "next/font/google";
import ChatbotWidget from "@/components/ChatbotWidget";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Komala Belur Srinivas — AI/ML Engineer",
  description:
    "Portfolio of Komala Belur Srinivas, an AI/ML engineer specializing in deep learning, multimodal systems, and production ML pipelines.",
  keywords: ["AI", "Machine Learning", "Data Science", "Python", "Deep Learning", "Portfolio"],
  openGraph: {
    title: "Komala Belur Srinivas — AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in deep learning, multimodal systems, and production ML pipelines. M.S. CS @ Hofstra University. Open to full-time roles.",
    url: "https://portfolio-f2c2oibdn-komala-b-srinivas-projects.vercel.app",
    siteName: "Komala Belur Srinivas",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Komala Belur Srinivas — AI/ML Engineer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Komala Belur Srinivas — AI/ML Engineer",
    description:
      "AI/ML Engineer · Deep Learning · Multimodal Systems · Production ML Pipelines",
    images: ["/og-image.jpg"],
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${outfit.variable}`}
    >
      <body className="antialiased">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
