import express, { Request, Response } from "express"
import { Budget } from "../models/budget.js"
import auth from "../middlewares/auth.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const budgets = await Budget.find()

  const toSend = budgets.map((b) => {
    const { userId, ...rest } = b
    return rest
  })

  res.send(toSend)
})

router.get("/:id", async (req, res) => {
  const [budget] = await Budget.find({ id: req.params.id })
  if (!budget) return res.status(404).send("The budget with the given ID was not found.")

  delete (budget as any).userId

  res.send(budget)
})

router.post("/", auth, async (req, res) => {
  const { error } = Budget.validate(req.body)
  if (error) return res.status(400).send(error)

  const { userId, ...budget } = await Budget.create(req.body)

  res.send(budget)
})

router.put("/:id", auth, async (req: Request<any>, res: Response) => {
  const { error } = Budget.validate({ ...req.body, userId: "1234" })
  if (error) return res.status(400).send(error)

  const [exists] = await Budget.find({ id: req.params.id })
  if (!exists) return res.status(400).send("Budget with the given ID does not exist.")

  const { userId, ...budget } = await Budget.update(req.params.id, req.body)

  res.send(budget)
})

router.delete("/:id", auth, async (req: Request<any>, res: Response) => {
  const [budget] = await Budget.find({ id: req.params.id })

  if (!budget) return res.status(400).send("Budget with the given ID does not exist.")

  await Budget.delete(req.params.id)

  delete (budget as any).userId

  res.send(budget)
})

export default router
