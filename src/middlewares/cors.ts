import { Request, Response, NextFunction } from "express"

export default function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", process.env.VALID_ORIGINS)

  next()
}
