import { beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import { User } from "../../../src/models/user.js"
import { app } from "../../../src/index.js"

describe("auth middleware", () => {
  let token = ""

  beforeEach(async () => {
    token = User.generateAuthToken({ id: "user1" } as any)
  })

  const exec = () => request(app).delete("/api/budgets/dkdkdkd").set("x-auth-token", token)

  it("should return 401 if no token is provided", async () => {
    token = ""

    const res = await exec()

    expect(res.status).toBe(401)
  })

  it("should return 400 if token is invalid", async () => {
    token = "a"

    const res = await exec()

    expect(res.status).toBe(400)
  })

  it("should return 200 if token is valid", async () => {
    const res = await exec()

    expect(res.status).toBe(200)
  })
})
