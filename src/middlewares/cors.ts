import { Request, Response, NextFunction } from "express"

export default function (req: Request, res: Response, next: NextFunction) {
  if (process.env.APP_ENVIRONMENT === "devnet") {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  }

  next()
}
