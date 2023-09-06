import express, { Express } from "express"
import budget from "../routes/budget.js"

export default function (app: Express) {
  app.use(express.json())
  app.use("/api/budgets/", budget)
}
