import express from "express"
import { z } from "zod"
import { getZodError } from "../utilities/getZodError.js"
import { Budget } from "../models/budget.js"

const router = express.Router()

const budgets: { id: number; name: string }[] = []

router.get("/", async (req, res) => {
  const budgets = await Budget.find()
  res.send(budgets)
})

router.get("/:id", (req, res) => {
  res.send({ name: "budget", id: req.params.id })
})

router.post("/", async (req, res) => {
  const { error } = validateBudget(req.body)
  if (error) return res.status(400).send(getZodError(error))

  // const budget = new BudgetModel(req.body.name)

  // res.send(budget)
})

router.put("/:id", (req, res) => {
  const budget = budgets.find((b) => b.id === +req.params.id)
  if (!budget) return res.status(404).send("The budget with the given ID was not found.")

  const { error } = validateBudget(req.body)
  if (error) return res.status(400).send(getZodError(error))

  budget.name = req.body.name
  res.send(budget)
})

router.delete("/:id", (req, res) => {
  const budget = budgets.find((b) => b.id === +req.params.id)
  if (!budget) return res.status(404).send("The budget with the given ID was not found.")

  const index = budgets.indexOf(budget)
  budgets.splice(index, 1)

  res.send(budget)
})

function validateBudget(budget: any) {
  const Schema = z.object({ name: z.string().min(3) })
  const result = Schema.safeParse(budget)

  const data = result.success ? result.data : null
  const error = !result.success ? result.error : null

  return { data, error }
}

export default router
