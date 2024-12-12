import {css, define, html, shadow, Form, InputArray, Observer} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class PokemonElement extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  static template = html`
    <template>
      <section class="view">
        <dl class="information">
          <dt><slot name="name">Unknown Name</slot></dt>
          <dd><slot name="stage">Unknown Stage</slot></dd>
          <dd><slot name="type">Unknown Type</slot></dd>
          <dd>
            <slot name="imageUrl">
              <img src="" alt="Pokemon image">
            </slot>
          </dd>
        </dl>
      </section>
      <mu-form class="edit">
        <label>
          <span>Name</span>
          <input name="name" />
        </label>
        <label>
          <span>Stage</span>
          <input name="stage" />
        </label>
        <label>
          <span>Type</span>
          <input name="type" />
        </label>
        <label>
          <span>Image</span>
          <input type="file" name="imageUrl" />
        </label>
      </mu-form>
    </template>
  `;
  static styles = css` 
    :host {
      display: contents;
      grid-column: 2/-2;
      --display-view-none: grid; /* Default state for "view" */
      --display-editor-none: none;
    }
    :host([mode="edit"]),
    :host([mode="new"]) {
      --display-view-none: none;
    }
    :host([mode="view"]) {
      --display-editor-none: none;
    }
    section.view {
      display: var(--display-view-none, grid);
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    
    mu-form.edit {
      display: var(--display-editor-none, grid);
      grid-column: 1/-1;
      grid-template-columns: subgrid;
    }
    
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



  constructor() {
    super();
    shadow(this)
      .template(PokemonElement.template)
      .styles(reset.styles, PokemonElement.styles);
    this.addEventListener("mu-form:submit", (event) =>
        this.submit(this.src, event.detail)
    );
    this.editButton.addEventListener("click", () =>
        (this.mode = "edit")
    );

  }

  get editButton() {
  return this.shadowRoot.getElementById("edit");
}

  get mode() {
  return this.getAttribute("mode");
}

  set mode(m) {
    this.setAttribute("mode", m);
  }

  get src() {
    return this.getAttribute("src");
  }

  _authObserver = new Observer(this, "pokemon:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user:", user);
      this._user = user;
      if (this.src && this.mode !== "new")
        this.hydrate(this.src);
    });
  }

  get authorization() {
  return (
    this._user?.authenticated && {
      Authorization: `Bearer ${this._user.token}`
    }
  );
}
  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }


  hydrate(url) {
    fetch(url, { headers: this.authorization }).then((res) => {
          if (res.status !== 200) throw new Error(`Status: ${res.status}`);
          return res.json();
        })
      .then((json) => {
        this.renderSlots(json);
        this.form.init = json; // populate mu-form
      })        .catch((error) =>
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

    submit(url, json) {
    const method = this.mode === "new" ? "POST" : "PUT";

    if (this.imageUrl) json.imageUrl = this.imageUrl;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      body: JSON.stringify(json)
    })
      .then((res) => {
        if (res.status !== (this.mode === "new" ? 201 : 200))
          throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        this.form.init = json;
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}:`, error);
      });
  }




}
