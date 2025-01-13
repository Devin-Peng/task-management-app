import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ChakraProvider from "./ChakraProvider";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Task Management App",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
