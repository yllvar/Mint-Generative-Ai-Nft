"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { generateArtworkFromLLM, generatePrompt } from "@/utils/llm-art-generator"
import Image from "next/image"
import { Loader2 } from "lucide-react"

// Trait options for the generator
const traitOptions = {
  "Character Type": ["Human", "Alien", "Robot", "Cyborg", "Ethereal"],
  "Suit Color": ["Blue", "Red", "Purple", "Gold", "Silver", "Black"],
  Background: ["Deep Space", "Nebula", "Planet Surface", "Space Station", "Wormhole"],
  Accessory: ["Jetpack", "Laser Sword", "Energy Shield", "Hologram", "Drone Companion"],
}

export function LLMNFTPreview() {
  const [attributes, setAttributes] = useState<Record<string, string>>({
    "Character Type": "Human",
    "Suit Color": "Blue",
    Background: "Deep Space",
    Accessory: "Jetpack",
  })

  const [customPrompt, setCustomPrompt] = useState("")
  const [useCustomPrompt, setUseCustomPrompt] = useState(false)
  const [previewImage, setPreviewImage] = useState("/placeholder.svg?height=500&width=500&text=AI Generated NFT")
  const [isGenerating, setIsGenerating] = useState(false)
  const [complexity, setComplexity] = useState([50])
  const [error, setError] = useState<string | null>(null)

  const generatePreview = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Generate the prompt based on attributes or use custom prompt
      const prompt = useCustomPrompt
        ? customPrompt
        : generatePrompt(attributes, `cosmic explorer with complexity level ${complexity[0]}%`)

      // Call the LLM API
      const result = await generateArtworkFromLLM({
        prompt,
        width: 512,
        height: 512,
      })

      // Update the preview
      setPreviewImage(result.imageUrl)
    } catch (error) {
      console.error("Error generating preview:", error)
      setError(error.message || "Failed to generate image")
    } finally {
      setIsGenerating(false)
    }
  }

  // Update an attribute
  const updateAttribute = (trait: string, value: string) => {
    setAttributes((prev) => ({
      ...prev,
      [trait]: value,
    }))
  }

  return (
    <Card className="bg-black/40 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 bg-black/50">
            <Image
              src={previewImage || "/placeholder.svg"}
              alt="AI Generated NFT Preview"
              fill
              className="object-cover"
            />

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <div className="text-primary font-bold">Generating AI Artwork...</div>
                <div className="text-xs text-primary-foreground/70 mt-2">This may take 15-30 seconds</div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                <div className="text-red-400 font-bold text-center px-4">Error: {error}</div>
                <Button variant="outline" size="sm" onClick={() => setError(null)} className="mt-4">
                  Dismiss
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">AI Art Generator</h3>
              <Button variant="outline" size="sm" onClick={generatePreview} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Complexity</Label>
                <Slider value={complexity} onValueChange={setComplexity} max={100} step={1} className="mt-2" />
              </div>

              {Object.entries(traitOptions).map(([trait, options]) => (
                <div key={trait}>
                  <Label className="text-xs text-muted-foreground">{trait}</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {options.map((option) => (
                      <Button
                        key={option}
                        variant={attributes[trait] === option ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => updateAttribute(trait, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="custom-prompt"
                    checked={useCustomPrompt}
                    onChange={(e) => setUseCustomPrompt(e.target.checked)}
                    className="rounded border-slate-700 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="custom-prompt" className="text-xs">
                    Use Custom Prompt
                  </Label>
                </div>

                {useCustomPrompt && (
                  <div className="mt-2">
                    <Input
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Enter custom prompt for the AI..."
                      className="text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

