import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { Pokemon } from "server/models";
import { Msg } from "../messages.ts";
import { Model } from "../model";

export class PokemonEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  @property()
  name?: string;

  @state()
  get pokemon(): Pokemon | undefined {
    return this.model.pokemon;
  }

  render() {
          return html`
      <main class="page">
        <mu-form
          .init=${this.pokemon}
          @mu-form:submit=${this._handleSubmit}>
          <label>
            <span>Pokemon</span>
            <input name="name" />
          </label>
          <label>
            <span>Description</span>
            <input  name="description" />
          </label>
          <label>
            <span>imageUrl</span>
            <input name="imageUrl" />
          </label>
          <label>
            <span>Type</span>
            <input name="type" />
          </label>
        </mu-form>
      </main>
      `;
  }

  constructor() {
    super("pokemon:model");
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ) {
    super.attributeChangedCallback(name, old, value);

    if (name === "name" && old !== value && value)
      this.dispatchMessage([
        "pokemon/select",
        { name: value }
      ]);
  }

  _handleSubmit(event: Form.SubmitEvent<Pokemon>) {
    console.log("Submitting form", event);
    if (this.pokemon && this.name) {
      this.dispatchMessage([
        "pokemon/save",
        {
          name: this.name,
          pokemon: event.detail,
          onSuccess: () =>
            History.dispatch(this, "history/navigate", {
              href: `/app/pokemon/${this.name}`
            }),
          onFailure: (err) => {
            console.log("Error saving pokemon", err);
          }
        }
      ]);
    }
  }
}