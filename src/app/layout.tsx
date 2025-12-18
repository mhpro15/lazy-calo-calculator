import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Lazy Calo | Food Calorie Estimator",
  description:
    "Estimate calories from your meals with humor. No food scales, no guilt—just honest math and roasts.",
  keywords: [
    "calories",
    "calorie counter",
    "food logging",
    "nutrition",
    "lazy calorie calculator",
  ],
  authors: [{ name: "Lazy Calo" }],
  openGraph: {
    title: "Lazy Calo | Food Calorie Estimator",
    description:
      "Estimate calories from your meals with humor. No food scales, no guilt—just honest math and roasts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
