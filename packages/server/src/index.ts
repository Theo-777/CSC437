// src/index.ts
import express, { Request, Response } from "express";
import {getPokemon} from "./services/pokemon-svc";
import {PokemonPage} from "./pages/pokemon";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// Assuming Express is already imported and `app` is initialized

app.get(
  "/pokemon/:pokemonId",
  (req: Request, res: Response) => {
    const { pokemonId } = req.params;
    const data = getPokemon(pokemonId);
    const page = new PokemonPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  }
);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
