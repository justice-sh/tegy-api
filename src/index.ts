import { config as configDotEnv } from "dotenv"
configDotEnv()

import express from "express"
import helmet from "helmet"
import morgan from "morgan"

const app = express()

app.use(express.json())
app.use(helmet())

if (app.get("env") === "development") {
  app.use(morgan("tiny"))
  console.log("Morgan enabled...")
}

app.get("/", (req, res) => {
  res.send("Hello world.")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
