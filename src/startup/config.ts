import winston from "winston"
import { AppWriteTransport } from "../utilities/appWriteTransport.js"

export default function () {
  winston.add(new winston.transports.File({ filename: "error.log", level: "error", handleExceptions: true }))
  winston.add(new winston.transports.File({ filename: "combined.log" }))
  winston.add(new AppWriteTransport())

  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    )
  }
}
