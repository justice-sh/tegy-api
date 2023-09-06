import { Express } from "express"
import helmet from "helmet"

export default function (app: Express) {
  if (process.env.NODE_ENV !== "production") return

  app.use(helmet())
}
