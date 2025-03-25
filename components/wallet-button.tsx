"use client"

import { useWallet } from "./wallet-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, LogOut } from "lucide-react"

export function WalletButton() {
  const { connected, publicKey, connect, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Connect Wallet
      </Button>
    )
  }

  if (!connected) {
    return (
      <Button onClick={connect} className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-primary/20 text-primary-foreground border-primary/30">
          <Wallet className="mr-2 h-4 w-4" />
          {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={disconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

