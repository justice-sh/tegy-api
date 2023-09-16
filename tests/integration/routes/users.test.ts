import { afterEach, beforeEach, describe, expect, test } from "vitest"
import request from "supertest"
import { User } from "../../../src/models/user"
import app from "../../../src/app.js"

describe("/api/users", () => {
  afterEach(async () => {
    await User.clear()
  })

  describe("POST /", () => {
    let name = "",
      password = "",
      email = ""

    const exec = () => request(app).post("/api/users").send({ name, password, email })

    beforeEach(() => {
      name = "user1"
      email = "me@gmail.com"
      password = "Password#1"
    })

    test("should return 400 if name is less than 3 characters", async () => {
      name = "us"

      const res = await exec()

      expect(res.status).toBe(400)
    })

    test("should return 400 if password is not valid", async () => {
      password = "1234"

      const res = await exec()

      expect(res.status).toBe(400)
    })

    test("should return 400 if email is not valid", async () => {
      email = "dkd"

      const res = await exec()

      expect(res.status).toBe(400)
    })

    test("should return 400 if user with email already exist", async () => {
      await User.create({ name, email, password })

      const res = await exec()

      expect(res.status).toBe(400)
    })

    test("should create user if valid", async () => {
      const res = await exec()

      expect(res.status).toBe(200)
      expect(res.body).toEqual(expect.objectContaining({ name, email }))
    })

    test("should return user's id", async () => {
      const res = await exec()

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("id")
    })

    test("should not return password field", async () => {
      const res = await exec()

      expect(res.status).toBe(200)
      expect(res.body).not.toHaveProperty("password")
    })
  })

  describe("GET /me", () => {
    let token = "",
      id = ""

    const exec = () => request(app).get("/api/users/me").set("x-auth-token", token)

    beforeEach(() => {
      token = User.generateAuthToken({ id } as any)
    })

    test("should return 401 if client is not logged in", async () => {
      token = ""

      const res = await exec()

      expect(res.status).toBe(401)
    })

    test("should return 400 if token does not include an ID property", async () => {
      id = ""

      const res = await exec()

      expect(res.status).toBe(400)
    })

    test("should return 404 if user with given ID was not found", async () => {
      token = User.generateAuthToken({ id: "lkdlddjldjdkddkd" } as any)

      const res = await exec()

      expect(res.status).toBe(404)
    })

    test("should return user if valid", async () => {
      const user = await User.create({ name: "justice", email: "me@gmail.com", password: "123456" })
      token = User.generateAuthToken(user)

      const res = await exec()

      expect(res.status).toBe(200)
      expect(res.body).toEqual(expect.objectContaining({ id: user.id, name: user.name, email: user.email }))
    })

    test("should not return user's password", async () => {
      const user = await User.create({ name: "justice", email: "me@gmail.com", password: "123456" })
      token = User.generateAuthToken(user)

      const res = await exec()

      expect(res.status).toBe(200)
      expect(res.body).not.toHaveProperty("password")
    })
  })
})
