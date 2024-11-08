import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class PokemonElement extends HTMLElement {
  static template = html`
    <template>
      <dl class="information">
        <dt>Poliwhirl</dt>
        <dd>First Evolution</dd>
        <dd>Water Type</dd>
      </dl>      
    </template>
  `;

  static styles = css`

     dl {
       display: flex;
      justify-content: space-evenly;
  }

  dt {
      text-align: center;
  }

  dd {
      margin-left: 0;
  }

  dt, dd {
      border: 1px solid lightgray;
      padding: 0 1em;
  }
  `;

  constructor() {
    super();
    shadow(this)
      .template(PokemonElement.template)
      .styles(reset.styles, PokemonElement.styles);
  }
}