import express, { Express } from "express"
import budget from "../routes/budget.js"
import home from "../routes/home.js"

export default function (app: Express) {
  app.use(express.json())
  app.use("/api/budgets/", budget)
  app.use("/", home)
}
