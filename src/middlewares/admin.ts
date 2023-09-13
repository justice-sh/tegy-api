import { Request, Response, NextFunction } from "express"

export default function (req: Request<{ user: any }>, res: Response, next: NextFunction) {
  if (!req.params.user.isAdmin) return res.status(403).send("Access denied.")

  next()
}
