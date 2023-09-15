import winston from "winston"
import app from "./app.js"

const PORT = process.env.PORT || 3000
app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`))
