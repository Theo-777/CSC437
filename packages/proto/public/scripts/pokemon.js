import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class PokemonElement extends HTMLElement {
  static template = html`
    <template>
      <dl class="information">
        <dt><slot name="name">Unknown Name</slot></dt>
        <dd><slot name="stage">Unknown Stage</slot></dd>
        <dd><slot name="type">Unknown Type</slot></dd>
        <dd><slot name="imageUrl"><img src="" alt="Pokemon image"></slot></dd>
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

  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  hydrate(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) =>
        console.error(`Failed to load data from ${url}:`, error)
      );
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const fragment = document.createDocumentFragment();

    entries.forEach(([key, value]) => {
      let element;

      if (key === 'imageUrl') {
        element = document.createElement('img');
        element.slot = key;
        element.src = value;
        element.alt = json.name || 'Pokemon image';
      } else {
        element = document.createElement('span');
        element.slot = key;
        element.textContent = value;
      }

      fragment.appendChild(element);
    });

    this.replaceChildren(fragment);
  }

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
    dt,
    dd {
      border: 1px solid lightgray;
      padding: 0 1em;
    }
  `;
}
