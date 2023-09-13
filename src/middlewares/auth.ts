import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { config } from "../config/index.js"

export default function (req: Request<{ user: any }>, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token")
  if (!token) return res.status(401).send("Access denied. No token was provided.")

  try {
    const decoded = jwt.verify(token, config.get("jwt_private_key"))
    req.params.user = decoded
    next()
  } catch (error) {
    res.status(400).send("Invalid token.")
  }
}
