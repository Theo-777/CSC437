import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Pokemon } from "server/models";

export class HomeViewElement extends LitElement {
    src = "/api/pokemons";

    @state()
    pokemonIndex = new Array<Pokemon>();

    _authObserver = new Observer<Auth.Model>(
    this,
    "pokemon:auth"
  );

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }

    render() {
        const pokemonList = this.pokemonIndex.map(this.renderItem);

        return html`
            <main class="page">
                <header>
                    <h2>Your pokemon</h2>
                </header>
                <dl>${pokemonList}</dl>
            </main>
        `;
    }

    renderItem(t: Pokemon) {
    const { name, type } = t;
    const { _id } = t as unknown as { _id: string };

    return html`
        <dt>
          ${name}
        </dt>
        <dt>Typing
        </dt>

        <dd>${type}
          <a href="/app/pokemons/${_id}">${name}</a>
        </dd>
      `;
  }

    hydrate(url: string) {
        fetch(url, {
            headers: Auth.headers(this._user)
        })
            .then((res: Response) => {
                if (res.status === 200) return res.json();
                throw `Server responded with status ${res.status}`;
            })
            .then((json: unknown) => {
                if (json) {
                    const {data} = json as { data: Array<Pokemon> };
                    this.pokemonIndex = data;
                }
            })
            .catch((err) =>
                console.log("Failed to tour data:", err)
            );
    }
}
