import "express-async-errors"
import { config as configDotEnv } from "dotenv"
import express from "express"
import prod from "./startup/prod.js"
import dev from "./startup/dev.js"
import routes from "./startup/routes.js"
import error from "./middlewares/error.js"
import logging from "./startup/logging.js"
import winston from "winston"
import db from "./startup/db.js"

configDotEnv()
const app = express()
logging()
db()
dev(app)
prod(app)
routes(app)
app.use(error)

const port = process.env.PORT || 3000
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`))

export default server
