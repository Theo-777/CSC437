import { Pokemon } from "server/models";

export interface Model {
  pokemon?: Pokemon ;
}

export const init: Model = {};

export type Msg =
  | ["pokemon/save", { name: string; pokemon: Pokemon }]
  | ["pokemon/select", { name: string }]
