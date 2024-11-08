// src/services/pokemon-svc.ts
import {Pokemon, PokemonType, EvolutionStage} from "../models/pokemon";

const pokemons = {
  politoed: {
    name: "Politoed",
    description:
      "Politoed is a green, bipedal, amphibian Pokémon with yellow hands, belly, throat, and toes that resembles a frog. It has a long, curled hair on top of its head and pink cheek spots that are smaller on the female than on the male.",
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/186.png",
    type: "Water" as PokemonType,
    evolutions: [
      {
          name: "Poliwag",
          stage: "Base Stage" as EvolutionStage,
          type: "Water" as PokemonType,
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/060.png"
      },
      {
          name: "Poliwhirl",
          stage: "First Evolution" as EvolutionStage,
          type: "Water" as PokemonType,
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/061.png"
      }
    ]
  },
};

export function getPokemon(_: string) {
  return pokemons["politoed"];
}
