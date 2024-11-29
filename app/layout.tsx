import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientWalletProvider from "./providers/WalletProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ChronoVault",
  description: "Solana Time Capsule App",
  other: {
    'format-detection': 'telephone=no, date=no, email=no, address=no'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientWalletProvider>{children}</ClientWalletProvider>
      </body>
    </html>
  );
}
