import express, { Request, Response } from "express";
import { Pokemon } from "../models/pokemon";

import Pokemons from "../services/pokemon-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Pokemons.index()
    .then((list: Pokemon[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  Pokemons.get(name)
    .then((pokemon: Pokemon) => res.json(pokemon))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newPokemon = req.body;

  Pokemons.create(newPokemon)
    .then((pokemon: Pokemon) =>
      res.status(201).json(pokemon)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  const newPokemon = req.body;

  Pokemons
    .update(name, newPokemon)
    .then((pokemon: Pokemon) => res.json(pokemon))
    .catch((err) => res.status(404).end());
});

router.delete("/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  Pokemons.remove(name)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;