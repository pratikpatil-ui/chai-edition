export interface JourneyStage {
  id: string;
  number: number;
  word: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export interface CulturalEdition {
  id: string;
  region: string;
  name: string;
  cue: string;
  image: string;
  imageAlt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  tastingNotes: string;
  image: string;
  imageAlt: string;
}
