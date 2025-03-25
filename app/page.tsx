import { Metadata } from "@/components/metadata"
import { MintSection } from "@/components/mint-section"
import { WalletMultiButton } from "@/components/wallet-multi-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-white">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-center sm:text-left">AI-Generated Solana NFTs</h1>
          <WalletMultiButton />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          <Metadata />
          <MintSection />
        </div>
      </div>
    </main>
  )
}

