import { Express } from "express"
import morgan from "morgan"

export default function (app: Express) {
  if (process.env.NODE_ENV !== "development") return

  app.use(morgan("tiny"))
  console.log("Morgan enabled...")
}
