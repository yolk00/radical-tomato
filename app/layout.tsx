import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";

import { NavigationEvents } from "./components/NavigationEvents";
import { Suspense } from "react";

import { VideoLoadedProvider } from "@/utils/VideoLoadedContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Radical Tomato",
    default: "Radical Tomato",
  },
  description:
    "Resource for finding out more on the episodes and music of Cowboy Bebop (anime).",
  // description: "dB of Cowboy Bebop episodes and music.",
  openGraph: {
    type: "website",
    title: "Radical Tomato",
    description:
      "Resource for finding out more on the episodes and music of Cowboy Bebop (anime).",
    siteName: "Radical Tomato",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} p-5 antialiased`}
      >
        <Navbar />
        <VideoLoadedProvider>
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </VideoLoadedProvider>
      </body>
    </html>
  );
}

function TempSquare() {
  return (
    <div className="absolute inset-0 flex">
      <div className="size-100 bg-lime-300"></div>
    </div>
  );
}
