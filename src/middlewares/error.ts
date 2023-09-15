import { Request, Response, NextFunction } from "express"
import winston from "winston"

export default function ({ metadata, ...err }: any, req: Request, res: Response, next: NextFunction) {
  winston.error({ ...err, errorMiddleware: true })

  if (err.code === 5) return res.status(400).send("Item with given ID does not.")

  res.status(500).send("Something failed.")
}
