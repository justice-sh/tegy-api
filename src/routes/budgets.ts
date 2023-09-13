import express, { Request, Response } from "express"
import { z } from "zod"
import { safeParseReturn } from "../utilities/zod.js"
import { Budget } from "../models/budget.js"
import auth from "../middlewares/auth.js"
import admin from "../middlewares/admin.js"

const router = express.Router()

const budgets: { id: number; name: string }[] = []

router.get("/", async (req, res) => {
  const budgets = await Budget.find()
  res.send(budgets)
})

router.get("/:id", async (req, res) => {
  const [budget] = await Budget.find({ id: req.params.id })

  if (!budget) return res.status(404).send("The budget with the given ID was not found.")

  res.send(budget)
})

router.post("/", auth, async (req, res) => {
  const { error } = validateBudget(req.body)
  if (error) return res.status(400).send(error)

  const budget = await Budget.create(req.body)

  res.send(budget)
})

router.put("/:id", (req, res) => {
  const budget = budgets.find((b) => b.id === +req.params.id)
  if (!budget) return res.status(404).send("The budget with the given ID was not found.")

  const { error } = validateBudget(req.body)
  if (error) return res.status(400).send(error)

  budget.name = req.body.name
  res.send(budget)
})

router.delete("/:id", [auth, admin], async (req: Request<any>, res: Response) => {
  const [budget] = await Budget.find({ id: req.params.id })

  if (!budget) return res.status(404).send("The budget with the given ID was not found.")

  await Budget.delete(req.params.id)

  res.send(budget)
})

function validateBudget(budget: any) {
  const Schema = z.object({ name: z.string().min(3), userId: z.string().min(3) })
  const result = Schema.safeParse(budget)
  return safeParseReturn(result)
}

export default router
