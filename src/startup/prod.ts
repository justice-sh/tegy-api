import { Express } from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "../middlewares/cors.js"

export default function (app: Express) {
  if (process.env.NODE_ENV === "production") {
    app.use(helmet())
    app.use(cors)
    app.use(compression())
  }
}
