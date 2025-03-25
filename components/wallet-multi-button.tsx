"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton as SolanaWalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

// Import wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css"

export function WalletMultiButton() {
  const { connected, publicKey } = useWallet()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className="wallet-adapter-button-wrapper w-full sm:w-auto">
      <SolanaWalletMultiButton className="wallet-adapter-button w-full justify-center sm:w-auto" />
      {connected && publicKey && (
        <p className="text-sm mt-2 text-center text-muted-foreground">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </p>
      )}
    </div>
  )
}

