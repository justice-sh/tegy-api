import express from "express"
import { safeParseReturn } from "../utilities/zod.js"
import { User } from "../models/user.js"
import { z } from "zod"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/", async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const [user] = await User.find({ email: req.body.email })
  if (!user) return res.status(400).send("Invalid email or password.")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password.")

  const token = User.generateAuthToken(user)

  res.send(token)
})

function validate(data: any) {
  const Schema = z.object({ email: z.string().email(), password: z.string().min(5) })
  const result = Schema.safeParse(data)
  return safeParseReturn(result)
}

export default router
