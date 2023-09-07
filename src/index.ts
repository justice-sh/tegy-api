import "express-async-errors"
import { config as configDotEnv } from "dotenv"
configDotEnv()

import express from "express"
import prod from "./startup/prod.js"
import dev from "./startup/dev.js"
import routes from "./startup/routes.js"
import db from "./startup/db.js"
import error from "./middlewares/error.js"
import { Budget } from "./models/budget.js"

const app = express()

export const dbClient = db()

Budget.createCollection()

dev(app)
prod(app)
routes(app)
app.use(error)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
