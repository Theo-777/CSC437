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
  default: () => pokemon_svc_default
});
module.exports = __toCommonJS(pokemon_svc_exports);
var import_mongoose = require("mongoose");
const EvolutionSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  stage: { type: String, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String }
});
const PokemonSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  type: { type: String, required: true },
  evolutions: [EvolutionSchema]
});
const PokemonModel = (0, import_mongoose.model)("Pokemon", PokemonSchema);
function index() {
  return PokemonModel.find();
}
function get(name) {
  return PokemonModel.find({ name }).then((list) => list[0]).catch(() => {
    throw `${name} Not Found`;
  });
}
function create(json) {
  const t = new PokemonModel(json);
  return t.save();
}
function update(name, pokemon) {
  return PokemonModel.findOneAndUpdate({ name }, pokemon, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${name} not updated`;
    else return updated;
  });
}
function remove(name) {
  return PokemonModel.findOneAndDelete({ name }).then(
    (deleted) => {
      if (!deleted) throw `${name} not deleted`;
    }
  );
}
var pokemon_svc_default = { index, get, create, update, remove };
