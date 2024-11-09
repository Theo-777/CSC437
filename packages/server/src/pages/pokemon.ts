// src/pages/pokemon.ts
import { css, html } from "@calpoly/mustang/server";
import { Evolution, Pokemon} from "../models/pokemon";
import renderPage from "./renderPage"; // generic page renderer

export class PokemonPage {
    data: Pokemon;

    constructor(data: Pokemon) {
        this.data = data;
    }

     render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: ["/styles/pokemon.css"],
      styles: [
        css`
          main.page {
            --page-grid-columns: 4;
            @media screen and (max-width: 48rem) {
              --page-grid-columns: 2;
            }`],
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
        const {name, description, imageUrl, type, evolutions} = this.data;
        return html`
            <header>
                <a href="index.html">&larr; Index</a>
                <h1>${name}</h1>
            </header>
            <section class="synopsis">
                <div><img src="${imageUrl}" alt="${name}"></div>
                <div>${description}</div>
            </section>
            <nav class="evolution">
                ${evolutions.map(evolution => this.renderEvolution(evolution))}
            </nav>
        `;
    }

    renderEvolution(evolution: Evolution) {
    const { name, stage, type, imageUrl } = evolution;
    return html`
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
