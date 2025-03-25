"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type WalletContextType = {
  connected: boolean
  publicKey: string | null
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  connect: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)

  const connect = () => {
    // Mock wallet connection
    setConnected(true)
    setPublicKey("8dHEFZ1WGqWz8MHQmGW2akhm1qJY9jKsVnZxwXVCQP2w")
  }

  const disconnect = () => {
    setConnected(false)
    setPublicKey(null)
  }

  return (
    <WalletContext.Provider value={{ connected, publicKey, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

