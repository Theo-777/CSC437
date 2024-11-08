"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var pokemon_exports = {};
__export(pokemon_exports, {
  PokemonPage: () => PokemonPage
});
module.exports = __toCommonJS(pokemon_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class PokemonPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: ["/styles/pokemon.css"],
      styles: [
        import_server.css`
          main.page {
            --page-grid-columns: 4;
            @media screen and (max-width: 48rem) {
              --page-grid-columns: 2;
            }`
      ],
      scripts: [
        `import { define } from "@calpoly/mustang";
        import { PokemonInfoElement } from "/scripts/pokemon.js";

        define({
          "pokemon-info": PokemonInfoElement
        });`
      ]
    });
  }
  renderBody() {
    const { name, description, imageUrl, type, evolutions } = this.data;
    return import_server.html`
            <header>
                <a href="index.html">&larr; Index</a>
                <h1>${name}</h1>
            </header>
            <section class="synopsis">
                <div><img src="${imageUrl}" alt="${name}"></div>
                <div>${description}</div>
            </section>
            <nav class="evolution">
                ${evolutions.map((evolution) => this.renderEvolution(evolution))}
            </nav>
        `;
  }
  renderEvolution(evolution) {
    const { name, stage, type, imageUrl } = evolution;
    return import_server.html`
      <a href="${name.toLowerCase()}.html">
        <dl class="information">
          <dt>${name}</dt>
            <dd>${stage}</dd>
            <dd>${type} Type</dd>
        </dl>
        <img src="${imageUrl}" alt="${name}">
      </a>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PokemonPage
});
