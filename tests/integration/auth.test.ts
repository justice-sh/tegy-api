import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { IncomingMessage, Server, ServerResponse } from "http"
import request from "supertest"
import { User } from "../../src/models/user.js"
import { Budget } from "../../src/models/budget.js"

let server: Server<typeof IncomingMessage, typeof ServerResponse>

describe("auth middleware", () => {
  let token = ""

  beforeEach(async () => {
    server = (await import("../../src/index.js")).default
    token = User.generateAuthToken({ name: "user1" } as any)
  })

  afterEach(async () => {
    await Budget.clear()
    server.close()
  })

  const exec = () =>
    request(server).post("/api/budgets").set("x-auth-token", token).send({ name: "budget1", userId: "user1" })

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
