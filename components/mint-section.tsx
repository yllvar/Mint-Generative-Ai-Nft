"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSolanaConnection } from "@/hooks/use-solana-connection"
import { useMintNFT } from "@/hooks/use-mint-nft"

// This would come from your environment variables in a real app
const CANDY_MACHINE_ID = "YOUR_CANDY_MACHINE_ID"

export function MintSection() {
  const { connected, publicKey } = useWallet()
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const connection = useSolanaConnection()
  const { mintNFT } = useMintNFT()

  // Mock data - in a real app, you'd fetch this from your candy machine
  const totalMinted = 423
  const totalSupply = 1000
  const mintPrice = 1.5

  // Ensure component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMint = async () => {
    if (!mounted) return
    if (!connected || !publicKey) {
      setError("Please connect your wallet first")
      return
    }

    try {
      setIsMinting(true)
      setError(null)

      const result = await mintNFT(CANDY_MACHINE_ID)

      // Handle successful mint
      setMintSuccess(true)
    } catch (err) {
      console.error("Mint error:", err)
      setError(err instanceof Error ? err.message : "Failed to mint NFT")
    } finally {
      setIsMinting(false)
    }
  }

  if (!mounted) {
    return (
      <Card className="bg-black/40 border-slate-700 backdrop-blur-sm h-full">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl">Mint Your NFT</CardTitle>
          <CardDescription>Loading mint interface...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10 p-4 md:p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/40 border-slate-700 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl">Mint Your AI NFT</CardTitle>
        <CardDescription>Mint a unique AI-generated cosmic explorer on Solana</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow p-4 md:p-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Minted</span>
            <span>
              {totalMinted} / {totalSupply}
            </span>
          </div>
          <Progress value={(totalMinted / totalSupply) * 100} className="h-2" />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {mintSuccess && (
          <Alert className="bg-green-900/20 border-green-800 text-green-400">
            <Check className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your AI-generated NFT has been minted successfully. View it in your wallet.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-auto pt-4">
          <div className="rounded-lg bg-black/30 p-4 border border-slate-700/50">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">NFT Details</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Mint Price</span>
                <span className="font-medium">{mintPrice} SOL</span>
              </li>
              <li className="flex justify-between">
                <span>Network</span>
                <span className="font-medium">Solana</span>
              </li>
              <li className="flex justify-between">
                <span>Generation</span>
                <span className="font-medium">AI-Generated</span>
              </li>
              <li className="flex justify-between">
                <span>Remaining</span>
                <span className="font-medium">{totalSupply - totalMinted}</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 md:p-6 pt-0">
        <Button className="w-full py-6 text-base" size="lg" disabled={!connected || isMinting} onClick={handleMint}>
          {isMinting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Minting AI NFT...
            </>
          ) : (
            `Mint for ${mintPrice} SOL`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

