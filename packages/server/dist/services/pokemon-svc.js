"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var pokemon_svc_exports = {};
__export(pokemon_svc_exports, {
  getPokemon: () => getPokemon
});
module.exports = __toCommonJS(pokemon_svc_exports);
const pokemons = {
  politoed: {
    name: "Politoed",
    description: "Politoed is a green, bipedal, amphibian Pok\xE9mon with yellow hands, belly, throat, and toes that resembles a frog. It has a long, curled hair on top of its head and pink cheek spots that are smaller on the female than on the male.",
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/186.png",
    type: "Water",
    evolutions: [
      {
        name: "Poliwag",
        stage: "Base Stage",
        type: "Water",
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/060.png"
      },
      {
        name: "Poliwhirl",
        stage: "First Evolution",
        type: "Water",
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/061.png"
      }
    ]
  }
};
function getPokemon(_) {
  return pokemons["politoed"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPokemon
});
