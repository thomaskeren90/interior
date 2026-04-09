import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceCraft AI — Redesign Any Interior with AI",
  description: "Upload a photo of your interior and transform it instantly. AI-powered interior design, virtual staging, sketch-to-image, and style transfer.",
  keywords: "AI interior design, virtual staging, room redesign, interior AI, home design AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
