import { LitElement, css, html } from "lit";
import {Events, define, Dropdown, Observer, Auth} from "@calpoly/mustang";
import {state} from "lit/decorators.js";

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

export class PokemonHeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  @state()
  userid: string = "trainer";
  render() {
    return html`
      <header>
          <h1>Pokemon</h1>
          <nav>
            <p><slot> Information </slot></p>
            <mu-dropdown>
              <a slot="actuator">
                Hello
                <span id="userid"></span>
              </a>
              <menu>
                <li>
                  <label @change=${toggleDarkMode}>
                    <input type="checkbox" />
                    Dark Mode
                  </label>
                </li>
                <li class="when-signed-in">
                  <a id="signout">Sign Out</a>
                </li>
                <li class="when-signed-out">
                  <a href="/login">Sign In</a>
                </li>
              </menu>
            </mu-dropdown>
          </nav>
      </header>
    `;
  }

  static styles = css`
   :host {
      display: contents;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    header p {
      --color-link: var(--color-link-inverted);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
    }
    #userid:empty::before {
      content: "trainer";
    }
    menu a {
      color: var(--color-link);
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }
  `;
  _authObserver = new Observer<Auth.Model>(
    this,
    "pokemon:auth"
  );

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
    });
  }

  static initializeOnce() {
    function toggleDarkMode(
      page: HTMLElement,
      checked: boolean
    ) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}