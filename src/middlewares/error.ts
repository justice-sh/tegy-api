import { Request, Response, NextFunction } from "express"
import winston from "winston"

export default function (
  { code, details, message, note, ...rest }: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  winston.error({ code, details, message, note })

  if (code === 5) return res.status(400).send("Item with given ID was not found.")

  res.status(500).send("Something failed.")
}
