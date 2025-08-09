import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lakhi Group - Pure Brilliance in Diamond Craftsmanship",
  description: "Leading diamond manufacturer combining innovation, tradition, and responsibility. Crafting the future of diamonds through pure excellence, craft, innovation, and ethical practices.",
  keywords: ["diamonds", "jewelry", "craftsmanship", "ethical sourcing", "innovation", "luxury"],
  authors: [{ name: "Lakhi Group" }],
  openGraph: {
    title: "Lakhi Group - Pure Brilliance in Diamond Craftsmanship",
    description: "Leading diamond manufacturer combining innovation, tradition, and responsibility.",
    type: "website",
    url: "https://lakhigroup.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={geistSans.className}>
        {children}
      </body>
    </html>
  );
}
