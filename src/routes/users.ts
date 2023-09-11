import express from "express"
import { getZodError } from "../utilities/getZodError.js"
import { User } from "../models/user.js"

const router = express.Router()

router.post("/", async (req, res) => {
  const { error } = User.validate(req.body)
  if (error) return res.status(400).send(getZodError(error))

  let [user] = await User.find({ email: req.body.email })
  if (user) return res.status(400).send("User already registered.")

  user = await User.create(req.body)
  res.send(user)
})

export default router
