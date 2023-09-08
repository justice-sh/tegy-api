import winston from "winston"
import { MyTransport } from "../utilities/customTransports.js"

export default function () {
  process.on("unhandledRejection", (ex) => {
    throw ex
  })

  winston.add(new winston.transports.File({ filename: "error.log", level: "error", handleExceptions: true }))
  winston.add(new MyTransport.File())
  winston.add(new MyTransport.Database())

  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        handleExceptions: true,
      })
    )
  }
}
