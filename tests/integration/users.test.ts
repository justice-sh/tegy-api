import { afterEach, describe, expect, it } from "vitest"
import request from "supertest"
import { User } from "../../src/models/user"
import server from "../../src/index.js"

describe("/api/users", () => {
  afterEach(async () => {
    await User.clear()
  })

  describe("POST /", () => {
    it("should return 400 if request param is invalid", async () => {
      const res = await request(server).post("/api/users")

      expect(res.status).toBe(400)
    })
  })

  // describe("GET /", () => {
  //   it("should return all budgets", async () => {
  //     await User.createMany([
  //       { name: "budget1", userId: "user1" },
  //       { name: "budget2", userId: "user2" },
  //     ])

  //     const res = await request(server).get("/api/budgets")

  //     expect(res.status).toBe(200)
  //     expect(res.body.length).toBe(2)
  //     expect(res.body[0]).toHaveProperty("name", "budget1")
  //     expect(res.body[1]).toHaveProperty("name", "budget2")
  //   })
  // })

  // describe("GET /:id", () => {
  //   it("should return 404 if budget with ID was not found", async () => {
  //     await User.create({ name: "budget1", userId: "user1" })

  //     const res = await request(server).get("/api/budgets/" + "noexisting")

  //     expect(res.status).toBe(404)
  //   })

  //   it("should return a single budget", async () => {
  //     const budget = await User.create({ name: "budget1", userId: "user1" })

  //     const res = await request(server).get("/api/budgets/" + budget.id)

  //     expect(res.status).toBe(200)
  //     expect(res.body).toHaveProperty("name", "budget1")
  //   })
  // })
})
