import { Request, Response, NextFunction } from "express"
import winston from "winston"

export default function (err: any, req: Request, res: Response, next: NextFunction) {
  winston.error(err)

  if (err.code === 5) return res.status(400).send("Item with given ID was not found.")

  res.status(500).send("Something failed.")
}
