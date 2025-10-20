import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const geistSans = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Book Overflow — Community for Book Lovers and Readers",
  description:
    "Book Overflow is a community-driven platform where readers ask questions, share insights, and discuss everything about books. Discover, learn, and connect with fellow book enthusiasts.",
  keywords: [
    "books",
    "reading",
    "literature",
    "book discussion",
    "Book Overflow",
    "book community",
    "ask about books",
    "book Q&A",
  ],
  authors: [{ name: "Book Overflow Team" }],
  openGraph: {
    title: "Book Overflow — Community for Book Lovers",
    description:
      "Join Book Overflow, the ultimate Q&A platform for readers and book enthusiasts. Ask questions, share reviews, and explore your next favorite book.",
    url: "https://bookoverflow.com",
    siteName: "Book Overflow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Overflow — Community for Readers",
    description:
      "Ask questions, share reviews, and connect with fellow book lovers on Book Overflow.",
    creator: "@bookoverflow",
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
        className={`${geistSans} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
