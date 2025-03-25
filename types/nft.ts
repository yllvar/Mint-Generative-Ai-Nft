export interface Trait {
  name: string
  fileName: string
  weight: number
}

export interface TraitLayer {
  name: string
  traits: Trait[]
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: {
    trait_type: string
    value: string
  }[]
}

