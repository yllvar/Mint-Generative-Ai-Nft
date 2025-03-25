import type { NFTMetadata } from "@/types/nft"

// Types for the LLM generation
interface GenerationParams {
  prompt: string
  seed?: number
  style?: string
  negativePrompt?: string
  width?: number
  height?: number
}

interface GenerationResult {
  imageUrl: string
  seed: number
  prompt: string
}

// Generate a deterministic prompt based on NFT attributes
export function generatePrompt(attributes: Record<string, string>, theme = "cosmic explorer"): string {
  // Create a detailed prompt based on attributes
  const attributeDescriptions = Object.entries(attributes)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")

  return `A detailed digital illustration of a ${theme} with ${attributeDescriptions}. 
  Highly detailed, vibrant colors, sci-fi aesthetic, space background, 
  professional digital art, trending on artstation, 4k resolution.`
}

// Generate a unique seed from a string (deterministic)
export function generateSeedFromString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Call our API route to generate an image using Replicate
export async function generateArtworkFromLLM(params: GenerationParams): Promise<GenerationResult> {
  try {
    console.log("Generating artwork with params:", params)

    // Call our Next.js API route
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || response.statusText)
    }

    const data = await response.json()

    return {
      imageUrl: data.imageUrl,
      seed: data.seed,
      prompt: data.prompt,
    }
  } catch (error) {
    console.error("Error generating artwork:", error)
    throw new Error(`Failed to generate artwork: ${error.message}`)
  }
}

// Generate NFT with LLM-generated artwork
export async function generateNFTWithLLM(index: number, attributes: Record<string, string>): Promise<NFTMetadata> {
  // Generate a prompt based on attributes
  const prompt = generatePrompt(attributes)

  // Generate a deterministic seed from the prompt and index
  const seed = generateSeedFromString(`${prompt}-${index}`)

  // Generate the artwork
  const result = await generateArtworkFromLLM({
    prompt,
    seed,
    width: 1024,
    height: 1024,
    style: "vivid",
    negativePrompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy",
  })

  // Create the metadata
  const metadata: NFTMetadata = {
    name: `Cosmic Explorer #${index + 1}`,
    description: `A unique AI-generated cosmic explorer. Generated with prompt: ${prompt}`,
    image: result.imageUrl,
    attributes: Object.entries(attributes).map(([trait_type, value]) => ({
      trait_type,
      value,
    })),
  }

  // Add generation metadata
  metadata.attributes.push({
    trait_type: "Generation Seed",
    value: seed.toString(),
  })

  metadata.attributes.push({
    trait_type: "Generation Prompt",
    value: prompt,
  })

  return metadata
}

