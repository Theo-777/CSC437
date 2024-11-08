// src/models/pokemon.ts

export interface Pokemon {
  name: string;
  description: string;
  imageUrl: string;
  type: PokemonType;
  evolutions: Array<Evolution>;
}

export type PokemonType = "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy" | "Null";

export interface Evolution {
  name: string;
  stage: EvolutionStage;
  type: PokemonType;
  imageUrl: string;
}

export type EvolutionStage = "Base Stage" | "First Evolution" | "Second Evolution";
