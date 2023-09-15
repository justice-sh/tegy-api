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
import config from "./startup/config.js"

configDotEnv()

const app = express()

db()
logging()
config()
dev(app)
prod(app)
routes(app)
app.use(error)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`))

server.on("error", (e: any) => {
  if (e.code === "EADDRINUSE") {
    console.error("Address in use, retrying...")
    setTimeout(() => {
      server.close()
      server.listen(PORT)
    }, 1000)
  }
})

if (process.env.NODE_ENV === "test") {
  server.close()
}

export { server, PORT, app }
