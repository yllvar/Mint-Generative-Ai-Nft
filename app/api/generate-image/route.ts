import { type NextRequest, NextResponse } from "next/server"
import Replicate from "replicate"

// Types for the request
interface GenerateImageRequest {
  prompt: string
  seed?: number
  style?: string
  negativePrompt?: string
  width?: number
  height?: number
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: GenerateImageRequest = await request.json()

    // Validate the request
    if (!body.prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Initialize Replicate with the API token
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    // Using stability-ai/sdxl for high-quality image generation
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: body.prompt,
          negative_prompt: body.negativePrompt || "blurry, low quality, distorted, deformed, ugly, bad anatomy",
          width: body.width || 1024,
          height: body.height || 1024,
          seed: body.seed || Math.floor(Math.random() * 1000000),
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 25,
        },
      },
    )

    // The output is an array of image URLs
    const imageUrl = Array.isArray(output) ? output[0] : output

    if (!imageUrl) {
      return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
    }

    // Return the result
    return NextResponse.json({
      imageUrl,
      seed: body.seed || Math.floor(Math.random() * 1000000),
      prompt: body.prompt,
    })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: `Failed to generate image: ${error.message}` }, { status: 500 })
  }
}

