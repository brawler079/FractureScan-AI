import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut, SignInButton } from "@clerk/nextjs";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FractureScan AI | Bone Fracture Detection",
  description: "Advanced bone fracture detection model",
  icons: {
    icon: "/Demo.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <ClerkProvider>
          <Header />
          {children}
        </ClerkProvider>
        
      </body>
    </html>
  );
}
