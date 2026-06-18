import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";

import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "My Portfolio",
  description: "My portfolio project",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
