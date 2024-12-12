import { Pokemon } from "server/models";

export type Msg =
  | [
    "pokemon/save",
    {
      name: string;
      pokemon: Pokemon;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["pokemon/select", { name: string }]