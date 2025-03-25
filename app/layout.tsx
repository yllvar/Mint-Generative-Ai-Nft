import type React from "react"
import "./globals.css"
import { Providers } from "./providers"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solana NFT Minting",
  description: "Mint your generative NFT on Solana",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'