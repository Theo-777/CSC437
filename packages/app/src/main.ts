import { Auth, History, Store, Switch, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HomeViewElement } from "./views/home-view";
import { PokemonHeaderElement } from "./components/pokemon-header";

class AppElement extends LitElement {
  static uses = define({
    "home-view": HomeViewElement
  });

  protected render() {
    return html`
      <home-view></home-view>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    PokemonHeaderElement.initializeOnce();
  }
}
const routes = [
  {
    path: "/app/pokemon/:id",
    view: (params: Switch.Params) => html`
      <pokemon-view pokemon-id=${params.id}></pokemon-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "pokemon:history", "pokemon:auth");
    }
  },
  "home-view": HomeViewElement,

  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "pokemon:auth");
    }
  },
  "pokemon-app": AppElement,
  "pokemon-header": PokemonHeaderElement
});