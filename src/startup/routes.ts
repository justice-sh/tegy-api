import express, { Express } from "express"
import budgets from "../routes/budgets.js"
import users from "../routes/users.js"
import auth from "../routes/auth.js"
import home from "../routes/home.js"

export default function (app: Express) {
  app.use(express.json())
  app.use("/api/budgets/", budgets)
  app.use("/api/users/", users)
  app.use("/api/auth/", auth)
  app.use("/", home)
}
