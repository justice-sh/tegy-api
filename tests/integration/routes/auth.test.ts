import { beforeEach, describe, expect, test } from "vitest"
import request from "supertest"
import bcrypt from "bcrypt"
import { User } from "../../../src/models/user.js"
import app from "../../../src/app.js"

describe("/api/auth", () => {
  let name = "",
    email = "",
    password = ""

  beforeEach(async () => {
    name = "Justice"
    email = "authtest@gmail.com"
    password = "Password#1"
  })

  const exec = () => request(app).post("/api/auth").send({ email, password })

  test("should return 400 if email is invalid", async () => {
    email = "me"

    const res = await exec()

    expect(res.status).toBe(400)
  })

  test("should return 400 if password is invalid", async () => {
    password = "me"

    const res = await exec()

    expect(res.status).toBe(400)
  })

  test("should return 400 if user with email does not exist", async () => {
    const res = await exec()

    expect(res.status).toBe(400)
  })

  test("should return 400 if password is incorrect", async () => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    await User.create({ name, email, password: hashed })

    password = "Password#2"

    const res = await exec()

    expect(res.status).toBe(400)

    await User.clear()
  })

  test("should return valid JWT if request payload is valid", async () => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashed })

    const res = await exec()

    const token = User.generateAuthToken(user)

    expect(res.status).toBe(200)
    expect(res.text).toBe(token)

    await User.clear()
  })
})
