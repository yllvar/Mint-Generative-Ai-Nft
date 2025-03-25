"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LLMNFTPreview } from "./llm-nft-preview"

export function Metadata() {
  return (
    <Card className="bg-black/40 border-slate-700 backdrop-blur-sm h-full">
      <CardHeader className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <CardTitle className="text-xl md:text-2xl">Cosmic Explorers</CardTitle>
            <CardDescription>AI-Generated NFT Collection on Solana</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/20 text-primary-foreground self-start sm:self-auto">
            1,000 Items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <LLMNFTPreview />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
            <p className="text-sm md:text-base">
              A unique collection of AI-generated cosmic explorers traversing the Solana blockchain. Each NFT is
              uniquely created using advanced AI image generation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Price</h3>
              <p className="font-bold text-base md:text-lg">1.5 SOL</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Royalties</h3>
              <p className="font-bold text-base md:text-lg">5%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

