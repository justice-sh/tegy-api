import express from "express"
import { User } from "../models/user.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/", async (req, res) => {
  const { error } = User.validate(req.body)
  if (error) return res.status(400).send(error)

  let [user] = await User.find({ email: req.body.email })
  if (user) return res.status(400).send("User already registered.")

  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(req.body.password, salt)

  user = await User.create({ ...req.body, password: hashed })
  res.send(User.getData(user))
})

export default router
