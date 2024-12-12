import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import {Pokemon} from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "pokemon/select":
      selectPokemon(message[1], user).then((pokemon) =>
        apply((model) => ({ ...model, pokemon }))
      );
      break;
    case "pokemon/save":
      savePokemon(message[1], user)
        .then((pokemon) =>
          apply((model) => ({ ...model, pokemon }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function selectPokemon(
  msg: { name: string },
  user: Auth.User
) {
  return fetch(`/api/pokemons/${msg.name}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Pokemon:", json);
        return json as Pokemon;
      }
    });
}

function savePokemon(
  msg: {
    name: string;
    pokemon: Pokemon;
  },
  user: Auth.User
) {
  return fetch(`/api/pokemons/${msg.name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.pokemon)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save pokemon for ${msg.name}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Pokemon;
      return undefined;
    });
}