import { config as configDotEnv } from "dotenv"
configDotEnv()

import express from "express"
import prod from "./startup/prod.js"
import dev from "./startup/dev.js"
import routes from "./startup/routes.js"
import db from "./startup/db.js"
import { budetModel } from "./models/budget.js"

const app = express()

export const databaseClient = db()

// budetModel.deleteCollection()
// budetModel.create("April Budget")

dev(app)
prod(app)
routes(app)

app.get("/", (req, res) => {
  res.send("Hello world.")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
