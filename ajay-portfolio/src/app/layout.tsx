import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "@/components/ui/page-transition-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajayveersandhu.com"),
  title: "Ajayveer Sandhu | Portfolio",
  description: "HEY, I'M AJAYVEER ... COMPUTATIONAL MATHEMATICS & STATISTICS STUDENT AT THE UNIVERSITY OF WATERLOO. DRIVEN BY CURIOSITY AND A PASSION FOR PROBLEM-SOLVING.",
  keywords: ["Ajayveer Sandhu", "Portfolio", "University of Waterloo", "Computational Mathematics", "Statistics", "Software Development", "Python", "JavaScript", "React"],
  authors: [{ name: "Ajayveer Sandhu" }],
  creator: "Ajayveer Sandhu",
  publisher: "Ajayveer Sandhu",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajayveersandhu.com",
    title: "Ajayveer Sandhu | Portfolio",
    description: "HEY, I'M AJAYVEER ... COMPUTATIONAL MATHEMATICS & STATISTICS STUDENT AT THE UNIVERSITY OF WATERLOO. DRIVEN BY CURIOSITY AND A PASSION FOR PROBLEM-SOLVING.",
    siteName: "Ajayveer Sandhu Portfolio",
    images: [
      {
        url: "/ajayshot.jpg",
        width: 1200,
        height: 630,
        alt: "Ajayveer Sandhu - Computational Mathematics & Statistics Student",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajayveer Sandhu | Portfolio",
    description: "HEY, I'M AJAYVEER ... COMPUTATIONAL MATHEMATICS & STATISTICS STUDENT AT THE UNIVERSITY OF WATERLOO. DRIVEN BY CURIOSITY AND A PASSION FOR PROBLEM-SOLVING.",
    images: ["/ajayshot.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta property="og:image" content="https://ajayveersandhu.com/ajayshot.jpg" />
        <meta name="twitter:image" content="https://ajayveersandhu.com/ajayshot.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
