import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REACT Dashboard • Usage + Burn Tracker",
  description: "Live Reactive Network usage & $REACT burn tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}