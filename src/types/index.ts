export interface Edition {
  id: string;
  label: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  note: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  tastingNotes: string;
  image: string;
  imageAlt: string;
}

export interface BrewingStep {
  step: number;
  title: string;
  detail: string;
}

export interface NavLink {
  label: string;
  href: string;
}
