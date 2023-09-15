import winston from "winston"
import app, { PORT } from "./app.js"

app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`))
