"use client"

import { Connection } from "@solana/web3.js"
import { useMemo } from "react"

// Use a environment variable for the RPC endpoint
const SOLANA_RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.devnet.solana.com"

export function useSolanaConnection() {
  // Use useMemo to create the connection only once
  const connection = useMemo(() => {
    return new Connection(SOLANA_RPC_ENDPOINT, "confirmed")
  }, [])

  return connection
}

