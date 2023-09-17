import "express-async-errors"
import { config as configDotEnv } from "dotenv"
import express from "express"
import prod from "./startup/prod.js"
import dev from "./startup/dev.js"
import routes from "./startup/routes.js"
import error from "./middlewares/error.js"
import logging from "./startup/logging.js"
import db from "./startup/db.js"
import config from "./startup/config.js"

configDotEnv()

const app = express()

db()
logging()
config()
if (process.env.NODE_ENV === "development") dev(app)
if (process.env.NODE_ENV === "production") prod(app)
routes(app)
app.use(error)

export default app
