import { Express } from "express"
import morgan from "morgan"

export default function (app: Express) {
  app.use(morgan("tiny"))
  console.log("Morgan enabled...")
}
