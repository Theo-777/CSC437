// src/services/pokemon-svc.ts
// src/models/pokemon.ts (Example)
import { Pokemon } from "../models/pokemon";
import { Schema, model } from "mongoose";

const EvolutionSchema = new Schema({
  name: { type: String, required: true },
  stage: { type: String, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String }
});

const PokemonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  type: { type: String, required: true },
  evolutions: [EvolutionSchema]
});

const PokemonModel = model<Pokemon>("Pokemon", PokemonSchema);

function index(): Promise<Pokemon[]> {
  return PokemonModel.find();
}

function get(name: string): Promise<Pokemon> {
  return PokemonModel.find({ name })
    .then((list) => list[0])
    .catch(() => {
      throw `${name} Not Found`; // Throw an error if not found
    });
}


export default { index, get };
