import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import "./globals.css"
import WalletProviderWrapper from '@/components/providers/WalletProvider'
import { StorageProvider } from '@/components/providers/StorageProvider'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chrono Vault - Time Capsule App",
  description: "A decentralized time capsule app built on Solana",
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} dark bg-background`}>
        <WalletProviderWrapper>
          <StorageProvider>
            {children}
          </StorageProvider>
        </WalletProviderWrapper>
        <Toaster />
      </body>
    </html>
  )
}
