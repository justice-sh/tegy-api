import { config as dotconfig } from "dotenv";
dotconfig();

import config from "config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { z } from "zod";
import { getZodError } from "./utilities/getZodError.js";

const app = express();

app.use(express.json());
app.use(helmet());

console.log(config.get("name"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

app.get("/", (req, res) => {
  res.send("Hello world.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
