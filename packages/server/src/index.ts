// src/index.ts
import express, { Request, Response } from "express";
import {PokemonPage} from "./pages/pokemon";
import { connect } from "./services/mongo";
import Pokemon from "./services/pokemon-svc";
import Pokemons from "./routes/pokemons";


connect("PokemonDB"); // use your own db name here


const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());
app.use("/api/pokemons", Pokemons);


app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// Assuming Express is already imported and `app` is initialized

app.get("/pokemon/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  Pokemon.get(name).then((data) => {
      const page = new PokemonPage(data); // Create an instance of PokemonPage
      res
      .set("Content-Type", "text/html")
      .send(page.render());
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
